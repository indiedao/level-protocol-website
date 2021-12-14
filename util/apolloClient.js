import { useMemo } from 'react'
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import merge from 'deepmerge'
import { ApolloLink } from 'apollo-link'
import { onError } from 'apollo-link-error'

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'

let apolloClient

function createApolloClient(token) {
  // Set auth token:
  const headers = {}
  headers.Authorization = `Bearer ${token}`

  // Configure Apollo Client:
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        // GQL Errors:
        if (graphQLErrors) {
          graphQLErrors.forEach(({ message, locations, path }) => {
            // eslint-disable-next-line no-console
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            )

            // Unauthorized errors:
            if (message.match(/401/)) {
              if (typeof window !== 'undefined') window.location = '/401'
            }
          })
        }

        // Network Errors:
        if (networkError) console.log(`[Network error]: ${networkError}`) // eslint-disable-line no-console
      }),
      new HttpLink({
        uri: `${process.env.NEXT_PUBLIC_API_PATH}/graphql`,
        headers,
      }),
    ]),

    // Disable cache:
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
      },
      query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
      },
    },
    cache: new InMemoryCache({
      // Define primary keys (can be singular or composite):
      AttributeDefinitions: {
        Message: {
          keyFields: ['messageId', 'messageVersion'],
        },
      },
    }),
  })
}

export function initializeApollo(token, initialState = null) {
  const client = apolloClient ?? createApolloClient(token)

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = client.extract()

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache)

    // Restore the cache with the merged data
    client.cache.restore(data)
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return client
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = client

  return client
}

export function addApolloState(client, pageProps) {
  if (pageProps?.props) {
    return {
      ...pageProps,
      props: {
        ...pageProps.props,
        [APOLLO_STATE_PROP_NAME]: client.cache.extract(),
      },
    }
  }

  return pageProps
}

export function useApollo(pageProps) {
  const state = pageProps[APOLLO_STATE_PROP_NAME]
  const token = pageProps.auth?.token
  const store = useMemo(() => initializeApollo(token, state), [state, token])
  return store
}

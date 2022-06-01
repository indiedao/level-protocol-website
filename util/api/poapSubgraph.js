import { GraphQLClient } from 'graphql-request'

const graphQLClient = new GraphQLClient(
  'https://api.thegraph.com/subgraphs/name/poap-xyz/poap-xdai',
)

export const getTokensWithEventIds = async eventIds => {
  const resp = await graphQLClient.request(
    `
    query TokensWithEventIds($eventIds: [String!]!) {
      tokens(where: { event_in: $eventIds}) {
        owner {
          id
        }
      }
    }
  `,
    { eventIds },
  )

  return resp?.tokens
}

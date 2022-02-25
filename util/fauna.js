import { GraphQLClient } from 'graphql-request'

export const graphQLClient = new GraphQLClient(
  process.env.NEXT_PUBLIC_FAUNA_URL,
  {
    headers: {
      authorization: `Bearer ${process.env.FAUNADB_SECRET}`,
    },
  },
)

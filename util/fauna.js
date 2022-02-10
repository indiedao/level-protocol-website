import { GraphQLClient, gql } from 'graphql-request'

import { GET_COMMUNITY } from '../util/queries'

const graphQLClient = new GraphQLClient('https://graphql.fauna.com/graphql', {
  headers: {
    authorization: `Bearer ${process.env.FAUNADB_SECRET}`,
  },
})

export const getCommunity = address => {
  return graphQLClient
    .request(GET_COMMUNITY, { address })
    .then(({ community }) => community)
}

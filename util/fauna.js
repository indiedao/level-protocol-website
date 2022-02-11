import { GraphQLClient } from 'graphql-request'
import { GET_COMMUNITY } from './queries'

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

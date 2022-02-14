import { GraphQLClient } from 'graphql-request'

import { GET_COMMUNITY, GET_COMMUNITIES, CREATE_MEMBER_CONFIG } from './queries'

const graphQLClient = new GraphQLClient(process.env.FAUNADB_URL, {
  headers: {
    authorization: `Bearer ${process.env.FAUNADB_SECRET}`,
  },
})

export const getCommunity = address => {
  return graphQLClient
    .request(GET_COMMUNITY, { address })
    .then(({ community }) => community)
}

export const getCommunities = () => {
  return graphQLClient.request(GET_COMMUNITIES).then(communities => communities)
}

export const createMemberConfig = (config) => {
  return graphQLClient.request(CREATE_MEMBER_CONFIG, config).then(config => config)
}

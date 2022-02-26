import { GraphQLClient } from 'graphql-request'

import {
  FIND_COMMUNITY_BY_ADDRESS_QUERY,
  UPDATE_COMMUNITY_DATA_HASH_MUTATION,
  CREATE_MEMBER_CONFIG,
  GET_MEMBER_CONFIG,
} from './queries'

const graphQLClient = new GraphQLClient(process.env.NEXT_PUBLIC_FAUNA_URL, {
  headers: {
    authorization: `Bearer ${process.env.FAUNADB_SECRET}`,
  },
})

export const getCommunity = async address => {
  const resp = await graphQLClient.request(FIND_COMMUNITY_BY_ADDRESS_QUERY, {
    address,
  })
  return resp.findCommunityByAddress
}

export const updateCommunityDataHash = async ({ id, membersHash }) => {
  const resp = await graphQLClient.request(
    UPDATE_COMMUNITY_DATA_HASH_MUTATION,
    { id, membersHash },
  )
  return resp.community
}

export const createMemberConfig = async configParam => {
  const resp = await graphQLClient.request(CREATE_MEMBER_CONFIG, configParam)
  return resp.memberConfig
}

export const getMemberConfig = async memberAddress => {
  const resp = await graphQLClient.request(GET_MEMBER_CONFIG, {
    address: memberAddress,
  })
  return resp.memberConfig
}

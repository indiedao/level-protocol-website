import { GraphQLClient } from 'graphql-request'

import {
  CREATE_COMMUNITY_MUTATION,
  FIND_COMMUNITY_BY_ADDRESS_QUERY,
  UPDATE_COMMUNITY_DATA_HASH_MUTATION,
  CREATE_MEMBER_CONFIG,
  GET_MEMBER_CONFIG,
  UPDATE_COMMUNITY_SNAPSHOT_ENS,
} from './queries'

const graphQLClient = new GraphQLClient(process.env.NEXT_PUBLIC_FAUNA_URL, {
  headers: {
    authorization: `Bearer ${process.env.FAUNADB_SECRET}`,
  },
})

// TODO: validate inputs:
export const createCommunity = async community => {
  const resp = await graphQLClient.request(CREATE_COMMUNITY_MUTATION, community)
  return resp.community
}

export const findCommunityByAddress = async address => {
  const resp = await graphQLClient.request(FIND_COMMUNITY_BY_ADDRESS_QUERY, {
    address,
  })
  return resp.findCommunityByAddress
}

// TODO: validate inputs:
export const updateCommunityDataHash = async ({ id, membersHash }) => {
  const resp = await graphQLClient.request(
    UPDATE_COMMUNITY_DATA_HASH_MUTATION,
    { id, membersHash },
  )
  return resp.community
}

// TODO: validate inputs:
export const updateCommunitySnapshotEns = async ({ id, snapshotEns }) => {
  const resp = await graphQLClient.request(UPDATE_COMMUNITY_SNAPSHOT_ENS, {
    id,
    snapshotEns,
  })
  return resp.community
}

// TODO: validate inputs:
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

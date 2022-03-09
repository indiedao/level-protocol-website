import { GraphQLClient } from 'graphql-request'

import {
  CREATE_COMMUNITY_MUTATION,
  FIND_COMMUNITY_BY_ADDRESS_QUERY,
  UPDATE_COMMUNITY_DATA_HASH_MUTATION,
  CREATE_MEMBER_MUTATION,
  FIND_MEMBER_BY_ADDRESS_QUERY,
  UPDATE_COMMUNITY_SNAPSHOT_ENS_MUTATION,
  UPDATE_MEMBER_GITHUB_MUTATION,
  GET_MEMBERS_BY_CREATED_AT_ASC,
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
  const resp = await graphQLClient.request(
    UPDATE_COMMUNITY_SNAPSHOT_ENS_MUTATION,
    {
      id,
      snapshotEns,
    },
  )
  return resp.community
}

// TODO: validate inputs:
export const createMember = async member => {
  const resp = await graphQLClient.request(CREATE_MEMBER_MUTATION, member)
  return resp.member
}

export const findMemberByAddress = async address => {
  const resp = await graphQLClient.request(FIND_MEMBER_BY_ADDRESS_QUERY, {
    address,
  })
  return resp.findMemberByAddress
}

// TODO: validate inputs:
export const updateMemberGithub = async ({ id, github }) => {
  const resp = await graphQLClient.request(UPDATE_MEMBER_GITHUB_MUTATION, {
    id,
    github,
  })
  return resp.member
}

export const getAccessListFirst100 = async () => {
  const resp = await graphQLClient.request(GET_MEMBERS_BY_CREATED_AT_ASC, {
    // TODO: change to 100
    size: 3,
  })
  return resp.getMembersByCreatedAtAsc.data
}

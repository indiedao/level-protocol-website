import { GraphQLClient } from 'graphql-request'

import {
  CREATE_COMMUNITY_MUTATION,
  FIND_COMMUNITY_BY_ADDRESS_QUERY,
  UPDATE_COMMUNITY_DATA_HASH_MUTATION,
  CREATE_MEMBER_MUTATION,
  FIND_MEMBER_BY_ADDRESS_QUERY,
  UPDATE_COMMUNITY_SNAPSHOT_ENS_MUTATION,
  UPDATE_MEMBER_GITHUB_MUTATION,
  UPDATE_MEMBER_CACHE_MUTATION,
  GET_MEMBERS_BY_CREATED_AT_ASC,
  GET_MEMBERS_BY_CREATED_AT_DESC,
  CREATE_COMMUNITY_POAP_EVENT,
  GET_COMMUNITY_POAP_EVENTS,
  DELETE_COMMUNITY_POAP_EVENT,
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
export const updateCommunityDataHash = async ({ address, id, membersHash }) => {
  const resp = await graphQLClient.request(
    UPDATE_COMMUNITY_DATA_HASH_MUTATION,
    { address, id, membersHash },
  )
  return resp.community
}

// TODO: validate inputs:
export const updateCommunitySnapshotEns = async ({
  address,
  id,
  snapshotEns,
}) => {
  const resp = await graphQLClient.request(
    UPDATE_COMMUNITY_SNAPSHOT_ENS_MUTATION,
    {
      id,
      address,
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

// TODO: validate inputs:
export const updateMemberCache = async ({ id, nftSrc, ens }) => {
  const resp = await graphQLClient.request(UPDATE_MEMBER_CACHE_MUTATION, {
    id,
    nftSrc,
    ens,
  })
  return resp.member
}

export const getAccessListFirst480 = async () => {
  const resp = await graphQLClient.request(GET_MEMBERS_BY_CREATED_AT_ASC, {
    size: 480,
  })
  return resp.getMembersByCreatedAtAsc.data
}

export const getAccessListMostRecent = async () => {
  const resp = await graphQLClient.request(GET_MEMBERS_BY_CREATED_AT_DESC, {
    size: 1,
  })
  return resp.getMembersByCreatedAtDesc.data
}

export const createCommunityPoapEvent = async ({
  communityId,
  eventId,
  fancyId,
  name,
  imageUrl,
  description,
  startDate,
  endDate,
  url,
}) => {
  const resp = await graphQLClient.request(CREATE_COMMUNITY_POAP_EVENT, {
    communityId,
    eventId,
    fancyId,
    name,
    imageUrl,
    description,
    startDate,
    endDate,
    url,
  })
  return resp.createCommunityPoapEvent.data
}

export const getCommunityPoapEvents = async ({ communityId }) => {
  const resp = await graphQLClient.request(GET_COMMUNITY_POAP_EVENTS, {
    communityId,
  })
  return resp.getCommunityPoapEvents.data
}

export const deleteCommunityPoapEvent = async ({ id }) => {
  const resp = await graphQLClient.request(DELETE_COMMUNITY_POAP_EVENT, {
    id,
  })
  return resp.deleteCommunityPoapEvent.data
}

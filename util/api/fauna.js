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
  INCREMENT_MEMBERS_COUNT,
  INCREMENT_COMMUNITIES_COUNT,
  MEMBERS_COUNT,
  COMMUNITIES_COUNT,
  UPDATE_MEMBERS_COUNTER,
  UPDATE_COMMUNITIES_COUNTER,
  GET_ALL_COMMUNITIES,
} from './queries'

const graphQLClient = new GraphQLClient(process.env.NEXT_PUBLIC_FAUNA_URL, {
  headers: {
    authorization: `Bearer ${process.env.FAUNADB_SECRET}`,
  },
})

// TODO: validate inputs:
export const createCommunity = async community => {
  const resp = await graphQLClient.request(CREATE_COMMUNITY_MUTATION, community)

  if (resp.createCommunity) {
    await graphQLClient.request(INCREMENT_COMMUNITIES_COUNT)
    return resp.createCommunity
  }

  return undefined
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

  if (resp.createMember) {
    await graphQLClient.request(INCREMENT_MEMBERS_COUNT)
    return resp.createMember
  }

  return undefined
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

export const getAccessList = async (size = 480) => {
  const resp = await graphQLClient.request(GET_MEMBERS_BY_CREATED_AT_ASC, {
    size,
    cursor: null,
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

export const membersCount = async () => {
  const resp = await graphQLClient.request(MEMBERS_COUNT)
  return resp.membersCount
}

export const communitiesCount = async () => {
  const resp = await graphQLClient.request(COMMUNITIES_COUNT)
  return resp.communitiesCount
}

export const updateMembersCounter = async (id, counter) => {
  const resp = await graphQLClient.request(UPDATE_MEMBERS_COUNTER, {
    id,
    counter,
  })
  return resp?.updateMembersCounter
}

export const updateCommunitiesCounter = async (id, counter) => {
  const resp = await graphQLClient.request(UPDATE_COMMUNITIES_COUNTER, {
    id,
    counter,
  })
  return resp?.updateCommunitiesCounter
}

export const getAllCommunities = async (size = 20) => {
  const resp = await graphQLClient.request(GET_ALL_COMMUNITIES, {
    size,
  })
  return resp.allCommunities.data
}

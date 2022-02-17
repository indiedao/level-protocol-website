import { GraphQLClient } from 'graphql-request'

import {
  GET_COMMUNITY,
  CREATE_MEMBER_CONFIG,
  GET_COMMUNITY_BY_ADMIN,
  GET_MEMBER_CONFIG,
} from './queries'

const graphQLClient = new GraphQLClient(process.env.FAUNADB_URL, {
  headers: {
    authorization: `Bearer ${process.env.FAUNADB_SECRET}`,
  },
})

export const getCommunity = async ens => {
  try {
    const { community } = await graphQLClient.request(GET_COMMUNITY, {
      ens,
    })

    return { community }
  } catch (error) {
    console.error(error)
  }

  return false
}

export const getCommunityByAdmin = async adminAddress => {
  try {
    const { communityByAdmin } = await graphQLClient.request(
      GET_COMMUNITY_BY_ADMIN,
      {
        adminAddress,
      },
    )

    return { community: communityByAdmin }
  } catch (error) {
    console.error(error)
  }

  return false
}

export const createMemberConfig = async configParam => {
  try {
    const { memberConfig } = await graphQLClient.request(
      CREATE_MEMBER_CONFIG,
      configParam,
    )
    return memberConfig
  } catch (error) {
    console.error(error)
  }

  return false
}

export const getMemberConfig = async memberAddress => {
  try {
    const { memberConfig } = await graphQLClient.request(GET_MEMBER_CONFIG, {
      address: memberAddress,
    })
    return memberConfig
  } catch (error) {
    console.error(error)
  }

  return undefined
}

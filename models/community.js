import { getItems } from '../services/faunadb/faunadb.service'
import {
  GET_COMMUNITY,
  GET_COMMUNITY_BY_ADMIN,
} from '../resolvers/queries/communities'

export const getCommunity = async ens => {
  const { community } = getItems(GET_COMMUNITY, {
    ens,
  })

  return { community }
}

export const getCommunityByAdmin = async adminAddress => {
  const { communityByAdmin } = getItems(GET_COMMUNITY_BY_ADMIN, {
    adminAddress,
  })

  return { community: communityByAdmin }
}

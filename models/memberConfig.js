import { getItems } from '../services/faunadb/faunadb.service'
import { GET_MEMBER_CONFIG } from '../resolvers/queries/memberConfig'
import { CREATE_MEMBER_CONFIG } from '../resolvers/mutations/memberConfig'

export const createMemberConfig = async configParam => {
  const { memberConfig } = await getItems(CREATE_MEMBER_CONFIG, configParam)
  return memberConfig
}

export const getMemberConfig = async memberAddress => {
  const { memberConfig } = await getItems(GET_MEMBER_CONFIG, {
    address: memberAddress,
  })

  return memberConfig
}

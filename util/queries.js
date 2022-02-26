import gql from 'graphql-tag'

export const FIND_COMMUNITY_BY_ADDRESS_QUERY = gql`
  query FIND_COMMUNITY_BY_ADDRESS_QUERY($address: String!) {
    findCommunityByAddress(address: $address) {
      _id
      address
      name
      membersHash
    }
  }
`

export const UPDATE_COMMUNITY_DATA_HASH_MUTATION = gql`
  mutation UPDATE_COMMUNITY_DATA_HASH_MUTATION(
    $id: ID!
    $membersHash: String!
  ) {
    updateCommunity(id: $id, data: { membersHash: $membersHash }) {
      _id
      membersHash
    }
  }
`

export const GET_COMMUNITIES = gql`
  query GET_COMMUNITIES {
    allCommunities {
      data {
        _id
        name
        address
        ens
        members {
          data {
            username
            ens
          }
        }
        integrations {
          data {
            cid
          }
        }
      }
    }
  }
`

export const CREATE_MEMBER_CONFIG = gql`
  mutation CREATE_MEMBER_CONFIG(
    $address: String!
    $nftAddress: String!
    $nftId: String!
    $message: String!
    $signature: String!
    $colorHue: Int!
    $colorLightness: Int!
  ) {
    createMemberConfig(
      data: {
        address: $address
        nftAddress: $nftAddress
        nftId: $nftId
        message: $message
        signature: $signature
        colorHue: $colorHue
        colorLightness: $colorLightness
      }
    ) {
      nftAddress
      nftId
      message
      signature
      colorHue
      colorLightness
    }
  }
`

export const GET_MEMBER_CONFIG = gql`
  query GET_MEMBER_CONFIG($address: String!) {
    memberConfig(address: $address) {
      address
      nftAddress
      nftId
      message
      signature
      colorHue
      colorLightness
    }
  }
`

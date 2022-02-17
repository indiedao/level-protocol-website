import gql from 'graphql-tag'

export const GET_COMMUNITY = gql`
  query GET_COMMUNITY($ens: String!) {
    community(ens: $ens) {
      _id
      name
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
`

export const GET_COMMUNITY_BY_ADMIN = gql`
  query GET_COMMUNITY_BY_ADMIN($adminAddress: String!) {
    communityByAdmin(adminAddress: $adminAddress) {
      _id
      name
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
    $ens: String
    $nftAddress: String!
    $nftId: String!
    $message: String!
    $signature: String!
  ) {
    createMemberConfig(
      data: {
        ens: $ens
        nftAddress: $nftAddress
        nftId: $nftId
        message: $message
        signature: $signature
      }
    ) {
      ens
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
  mutation GET_MEMBER_CONFIG(
  ) {
    memberConfig(address: $address) {
      ens
      nftAddress
      nftId
      message
      signature
      colorHue
      colorLightness
    }
  }
`

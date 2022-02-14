import gql from 'graphql-tag'

export const GET_COMMUNITY = gql`
  query GET_COMMUNITY($address: String!) {
    community(address: $address) {
      _id
      name
      address
      ens
      members {
        data {
          username
          address
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
            address
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
        address: $address
        ens: $ens
        nftAddress: $nftAddress
        nftId: $nftId
        message: $message
        signature: $signature
      }
    ) {
      address
      ens
      nftAddress
      nftId
      message
      signature
    }
  }
`

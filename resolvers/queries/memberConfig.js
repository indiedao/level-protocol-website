import gql from 'graphql-tag'

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

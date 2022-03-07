import gql from 'graphql-tag'

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

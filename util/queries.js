import gql from 'graphql-tag'

export const CREATE_COMMUNITY_MUTATION = gql`
  mutation CREATE_COMMUNITY_MUTATION(
    $address: String!
    $createdAt: Time!
    $name: String!
    $membersHash: String!
  ) {
    createCommunity(
      data: {
        address: $address
        createdAt: $createdAt
        name: $name
        membersHash: $membersHash
      }
    ) {
      _id
      address
      createdAt
      name
      membersHash
    }
  }
`

export const FIND_COMMUNITY_BY_ADDRESS_QUERY = gql`
  query FIND_COMMUNITY_BY_ADDRESS_QUERY($address: String!) {
    findCommunityByAddress(address: $address) {
      _id
      address
      name
      membersHash
      snapshotEns
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

export const UPDATE_COMMUNITY_SNAPSHOT_ENS_MUTATION = gql`
  mutation UPDATE_COMMUNITY_SNAPSHOT_ENS($id: ID!, $snapshotEns: String!) {
    updateCommunity(id: $id, data: { snapshotEns: $snapshotEns }) {
      _id
      snapshotEns
    }
  }
`

export const CREATE_MEMBER_MUTATION = gql`
  mutation CREATE_MEMBER_MUTATION(
    $address: String!
    $createdAt: Time!
    $nftAddress: String!
    $nftId: String!
    $colorHue: Int!
    $colorLightness: Int!
  ) {
    createMember(
      data: {
        address: $address
        createdAt: $createdAt
        nftAddress: $nftAddress
        nftId: $nftId
        colorHue: $colorHue
        colorLightness: $colorLightness
      }
    ) {
      _id
      address
      createdAt
      nftAddress
      nftId
      colorHue
      colorLightness
    }
  }
`

export const FIND_MEMBER_BY_ADDRESS_QUERY = gql`
  query FIND_MEMBER_BY_ADDRESS_QUERY($address: String!) {
    findMemberByAddress(address: $address) {
      _id
      address
      nftAddress
      nftId
      colorHue
      colorLightness
      github
      nftSrc
      ens
    }
  }
`

export const UPDATE_MEMBER_GITHUB_MUTATION = gql`
  mutation UPDATE_MEMBER_GITHUB_MUTATION($id: ID!, $github: String!) {
    updateMember(id: $id, data: { github: $github }) {
      _id
      github
    }
  }
`

export const UPDATE_MEMBER_CACHE_MUTATION = gql`
  mutation UPDATE_MEMBER_CACHE_MUTATION(
    $id: ID!
    $nftSrc: String!
    $ens: String!
  ) {
    updateMember(id: $id, data: { nftSrc: $nftSrc, ens: $ens }) {
      _id
      nftSrc
      ens
    }
  }
`

export const GET_MEMBERS_BY_CREATED_AT_ASC = gql`
  query GET_MEMBERS_BY_CREATED_AT_ASC($size: Int, $cursor: String) {
    getMembersByCreatedAtAsc(_size: $size, _cursor: $cursor) {
      data {
        _id
        address
        nftAddress
        nftId
        colorHue
        colorLightness
        github
      }
      after
      before
    }
  }
`

export const GET_MEMBERS_BY_CREATED_AT_DESC = gql`
  query GET_MEMBERS_BY_CREATED_AT_DESC($size: Int, $cursor: String) {
    getMembersByCreatedAtDesc(_size: $size, _cursor: $cursor) {
      data {
        _id
        address
        nftAddress
        nftId
        colorHue
        colorLightness
        github
      }
      after
      before
    }
  }
`

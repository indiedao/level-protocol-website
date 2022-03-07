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

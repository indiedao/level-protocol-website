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
    communities {
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

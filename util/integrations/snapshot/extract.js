import { GraphQLClient } from 'graphql-request'
import gql from 'graphql-tag'

const GET_PROPOSALS_QUERY = gql`
  query GET_PROPOSALS_QUERY($ens: String!) {
    proposals(where: { space_in: [$ens], state: "closed" }) {
      id
    }
  }
`

const GET_VOTES_QUERY = gql`
  query GET_VOTES_QUERY($proposalId: String!) {
    votes(where: { proposal: $proposalId }) {
      id
      voter
      created
    }
  }
`

const graphQLClient = new GraphQLClient('https://hub.snapshot.org/graphql')

export const extract = async ({ ens }) => {
  // Fetch proposals:
  const { proposals } = await graphQLClient.request(GET_PROPOSALS_QUERY, {
    ens,
  })

  return Promise.all(
    proposals.map(async ({ id: proposalId }) => {
      const { votes } = await graphQLClient.request(GET_VOTES_QUERY, {
        proposalId,
      })

      return { id: proposalId, votes, ens }
    }),
  )
}

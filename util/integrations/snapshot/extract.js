import { GraphQLClient } from 'graphql-request'
import gql from 'graphql-tag'

const GET_PROPOSALS_QUERY = gql`
  query GET_PROPOSALS_QUERY($ens: String!) {
    proposals(where: { space_in: [$ens] }) {
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
      choice
    }
  }
`

const graphQLClient = new GraphQLClient('https://hub.snapshot.org/graphql')

export const extract = async ({ ens }) => {
  // Fetch proposals:
  const { proposals } = await graphQLClient.request(GET_PROPOSALS_QUERY, {
    ens,
  })

  // Fetch votes for each proposal:
  let allVotes = []
  for (let i = 0; i < proposals.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    const { votes } = await graphQLClient.request(GET_VOTES_QUERY, {
      proposalId: proposals[i].id,
    })
    allVotes = [...allVotes, ...votes]
  }

  // Map reduce each member's vote count:
  const memberVoteCounts = {}
  allVotes.forEach(vote => {
    if (!memberVoteCounts[vote.voter]) memberVoteCounts[vote.voter] = 0
    memberVoteCounts[vote.voter] += 1
  })

  return {
    memberVoteCounts,
  }
}

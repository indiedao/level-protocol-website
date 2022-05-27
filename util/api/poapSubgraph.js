import { GraphQLClient } from 'graphql-request'

const graphQLClient = new GraphQLClient(
  'https://api.thegraph.com/subgraphs/name/poap-xyz/poap-xdai',
)

export const getTokenCount = async address => {
  const resp = await graphQLClient.request(
    `
    query AccountTokensOwned($id: String!) {
      account(id: $id) {
        tokensOwned
      }
    }
  `,
    { id: address },
  )

  return resp?.account?.tokensOwned
}

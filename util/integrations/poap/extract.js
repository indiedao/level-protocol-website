import { getTokenCount } from '../../api/poapSubgraph'

export const extract = async ({ addresses }) => {
  // For each address, get POAP token count
  const addressCounts = await Promise.all(
    addresses.map(async address => ({
      address,
      count: await getTokenCount(address),
    })),
  )

  return addressCounts
}

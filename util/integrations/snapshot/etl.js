import pinata from '../../pinata'
import { findCommunityByAddress, updateCommunityDataHash } from '../../fauna'
import { extract } from './extract'
import { transform } from './transform'
import { load } from './load'

const etl = async address => {
  // Get DAO config:
  // TODO: stub into fauna
  const config = {
    integrations: {
      snapshot: {
        // TODO: resolve ens from dao address above:
        ens: 'indiedao.eth',
      },
    },
  }

  // Get Community:
  const community = await findCommunityByAddress(address)

  if (!config.integrations.snapshot)
    throw new Error('No configuration for Snapshot integration!')

  // Extract data:
  const { memberVoteCounts } = await extract({
    ens: config.integrations.snapshot.ens,
  })

  // Transform data:
  const data = await transform({ memberVoteCounts })

  // Load data:
  const updatedMembers = await load({ address, data })

  // Update Community membersHash:
  const { IpfsHash } = await pinata.pinJSONToIPFS(updatedMembers)
  await updateCommunityDataHash({
    id: community._id,
    membersHash: IpfsHash,
  })
}

export default etl

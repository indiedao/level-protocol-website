import { pinJSONToIPFS } from '../../pinata'
import { findCommunityByAddress, updateCommunityDataHash } from '../../fauna'
import { getIpfsData } from '../../ipfs'
import { transform } from './transform'
import { load } from './load'

const etl = async (address, epochData) => {
  // Get Community:
  const { _id: id, membersHash } = await findCommunityByAddress(address)

  // Load prior IPFS data
  let membersData = {}
  if (membersHash) {
    membersData = await getIpfsData(membersHash)
  }

  // Extract data:
  // const { name } = epochData

  // Transform data:
  const transformedData = await transform(epochData)

  // Load data:
  const updatedMembers = await load(membersData, transformedData)

  // Pre-save check:
  const { membersHash: confirmMembersHash } = await findCommunityByAddress(
    address,
  )

  if (confirmMembersHash !== membersHash) {
    // TODO: This will not catch every case, but should get most.
    throw new Error('Another ETL was running simultaneously; please try again.')
  }

  // Update Community membersHash:
  const { IpfsHash } = await pinJSONToIPFS(updatedMembers)
  await updateCommunityDataHash({
    address,
    id,
    membersHash: IpfsHash,
  })
}

export default etl

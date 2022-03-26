import { findCommunityByAddress, updateCommunityDataHash } from './fauna'
import { pinJSONToIPFS } from './pinata'
import { getIpfsData } from './ipfs'

export const getCommunityMembersHashes = async address => {
  const { membersHash } = await findCommunityByAddress(address)

  let membersDataHashes = {}
  if (membersHash) {
    membersDataHashes = await getIpfsData(membersHash)
  }

  return { membersHash, membersDataHashes }
}

export const updateCommunityMembersHash = async (
  address,
  initialMembersHash,
  updatedMembersDataHashes,
) => {
  const { membersHash: confirmMembersHash } = await findCommunityByAddress(
    address,
  )

  if (confirmMembersHash !== initialMembersHash) {
    // This will not catch every case, but should get most.
    throw new Error('Another ETL was running simultaneously; please try again.')
  }

  // Update Community membersHash:
  const { IpfsHash } = await pinJSONToIPFS(updatedMembersDataHashes)
  await updateCommunityDataHash({
    address,
    membersHash: IpfsHash,
  })
}

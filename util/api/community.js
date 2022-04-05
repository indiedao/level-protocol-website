import { findCommunityByAddress, updateCommunityDataHash } from './fauna'
import { pinJSONToIPFS } from './pinata'
import { getIpfsData } from './ipfs'

export const getCommunityWithMembersHashes = async address => {
  const community = await findCommunityByAddress(address)
  const { membersHash } = community

  let membersDataHashes = {}
  if (membersHash) {
    membersDataHashes = await getIpfsData(membersHash)
  }

  return { ...community, membersDataHashes }
}

export const updateCommunityMembersHash = async (
  community,
  updatedMembersDataHashes,
) => {
  const { address, _id: id, membersHash: initialMembersHash } = community
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
    id,
    address,
    membersHash: IpfsHash,
  })
}

import { pinJSONToIPFS } from './pinata'
import { getIpfsData } from './ipfs'

const simpleMergeMethod = (existingData, newData) => ({
  ...existingData,
  ...newData,
})

export const updateMemberData = async (
  integrationName,
  newData,
  currentIpfsHash = null,
  mergeMethod = simpleMergeMethod,
) => {
  // first get any past member data
  let memberData = {}
  if (currentIpfsHash) {
    memberData = await getIpfsData(currentIpfsHash)
  }

  const existingData = memberData[integrationName] || {}

  // merge in new data
  memberData = {
    ...memberData,
    [integrationName]: mergeMethod(existingData, newData),
  }

  // and then resave the data to IPFS
  const { IpfsHash } = await pinJSONToIPFS(memberData)
  return IpfsHash
}

export const mergeMembersData = async (
  integrationName,
  membersDataHashes,
  data,
  mergeMethod = simpleMergeMethod,
) => {
  // Get list of member addresses that need to be updated
  const incomingDataAddresses = Object.keys(data)

  // Update each member’s data
  const updatedIpfsHashes = await Promise.all(
    incomingDataAddresses.map(async address =>
      updateMemberData(
        integrationName,
        data[address],
        membersDataHashes[address],
        mergeMethod,
      ),
    ),
  )

  // Return updated members data hashes
  return incomingDataAddresses.reduce(
    (updatedMembersDataHashes, address, index) => ({
      ...updatedMembersDataHashes,
      [address]: updatedIpfsHashes[index],
    }),
    membersDataHashes,
  )
}

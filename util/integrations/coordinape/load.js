import { pinJSONToIPFS } from '../../pinata'
import { getIpfsData } from '../../ipfs'

const upsertMemberData = async (data, ipfsHash = null) => {
  try {
    // first get any past member data
    let memberData = {}
    if (ipfsHash) {
      memberData = await getIpfsData(ipfsHash)
    }

    // then merge in new data
    const { epochNumber, period, received, sent, source } = data
    memberData = {
      ...memberData,
      coordinape: {
        ...(memberData.coordinape || {}),
        [source]: {
          epochNumber,
          period,
          received,
          sent,
        },
      },
    }

    // and then resave the data to IPFS
    const { IpfsHash: updatedIpfsHash } = await pinJSONToIPFS(memberData)
    return updatedIpfsHash
  } catch (error) {
    // TODO: Better error handling; this fails silently
    console.log(error) // eslint-disable-line no-console
    return ipfsHash
  }
}

export const load = async (members, data) => {
  // Get list of member addresses:
  const incomingDataAddresses = Object.keys(data)

  // Update each member’s data:
  const updatedIpfsHashes = await Promise.all(
    incomingDataAddresses.map(async address =>
      upsertMemberData(data[address], members[address]),
    ),
  )

  // Return updated Members list so that ETL controller can update Community membersHash:
  return incomingDataAddresses.reduce(
    (updatedMembers, address, index) => ({
      ...updatedMembers,
      [address]: updatedIpfsHashes[index],
    }),
    members,
  )
}

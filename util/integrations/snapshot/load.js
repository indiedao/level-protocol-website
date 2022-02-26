import pinataSDK from '@pinata/sdk'

const pinata = pinataSDK(
  process.env.PINATA_PUBLIC_API_KEY,
  process.env.PINATA_PRIVATE_API_KEY,
)

export const load = async ({ dao, data }) => {
  // TODO: get config for dao
  console.log('loading config for dao:', dao)
  // TODO: pull current members index from IPFS (from config pointer)

  // Update each member file:
  const addresses = Object.keys(data.memberVoteCounts)
  const updatedMembers = {}
  for (let i = 0; i < addresses.length; i += 1) {
    // TODO: connect from current members index
    console.log('loading member file for member:', addresses[i])
    const memberFile = {}

    if (!memberFile.snapshot) memberFile.snapshot = {}
    if (!memberFile.snapshot.votes) memberFile.snapshot.votes = 0
    memberFile.snapshot.votes += data.memberVoteCounts[addresses[i]]

    // eslint-disable-next-line no-await-in-loop
    const { IpfsHash } = await pinata.pinJSONToIPFS(memberFile)
    updatedMembers[addresses[i]] = IpfsHash
  }

  console.log('updated Members', updatedMembers)

  // TODO update member hashes
  return updatedMembers
}

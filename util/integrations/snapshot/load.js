import pinata from '../../pinata'

export const load = async ({ address, data }) => {
  // TODO: get config for community address
  console.log('loading config for community:', address)
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

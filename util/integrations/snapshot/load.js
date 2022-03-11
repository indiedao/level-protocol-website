import pinata from '../../pinata'

export const load = async data => {
  // Update each member file:
  const addresses = Object.keys(data.memberVoteCounts)
  const updatedMembers = {}
  for (let i = 0; i < addresses.length; i += 1) {
    // Start fresh each update
    // TODO: load existing seasonal data and merge:
    const memberFile = {
      snapshot: {
        votes: 0,
      },
    }

    memberFile.snapshot.votes += data.memberVoteCounts[addresses[i]]

    // eslint-disable-next-line no-await-in-loop
    const { IpfsHash } = await pinata.pinJSONToIPFS(memberFile)
    updatedMembers[addresses[i]] = IpfsHash
  }

  console.log('updated Members', updatedMembers) // eslint-disable-line no-console

  // TODO update member hashes
  return updatedMembers
}

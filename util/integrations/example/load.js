import pinata from '../../pinata'

export const load = async data => {
  // Get list of member addresses:
  const addresses = Object.keys(data)
  const updatedMembers = {}

  // Update each member's data:
  for (let i = 0; i < addresses.length; i += 1) {
    /**
     * (Optional)
     * Load exising member data here if you want to merge old data into new:
     */

    // TODO: add example of loading existing member data file here:

    /**
     * Pin new member data files to IPFS, and track new members hash map:
     */
    // eslint-disable-next-line no-await-in-loop
    const { IpfsHash } = await pinata.pinJSONToIPFS(data[addresses[i]])
    updatedMembers[addresses[i]] = IpfsHash
  }

  // Return updated Members list so that ETL controller can update Community membersHash:
  return updatedMembers
}

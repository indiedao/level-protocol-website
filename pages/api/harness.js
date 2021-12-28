import { makeFileObjects, storeFiles } from '../../util/web3Storage'
import { getCommunities } from '../../util/fauna'
import { getSourcecredContributions } from '../../util/sourcecred'

export default async (req, res) => {
  if (req.method === 'POST') {
    const communitiesResponse = await getCommunities()
    const members = communitiesResponse[0].data.data.members
    const contributions = await getSourcecredContributions()
    const coordinape = req.body

    const result = members
      .map(member => ({
        ...member,
        sourcredData: contributions.filter(
          contribution => contribution.name === member.username,
        ),
        coordinapeData: coordinape.filter(
          item =>
            item.address &&
            item.address.toLowerCase() === member.address.toLowerCase(),
        ),
      }))
      .flat()

    // TODO:
    // - Get current CID from FaunaDB if any.
    // - Update the data.
    // - Save the data to IPFS and get the new CID.
    // - Update the CID in FaunaDB.

    // const files = makeFileObjects(result)
    // const cid = await storeFiles(files)

    res.statusCode = 200
    res.json({ result })
  }
}

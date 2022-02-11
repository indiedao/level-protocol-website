import { makeFileObjects, storeFiles } from '../../../util/web3Storage'
import { getCommunity } from '../../../util/fauna'

export const aggregateThirdPartyData = async (
  communityData,
  sourceCredContributions,
) =>
  communityData.members.data
    .map(member => ({
      ...member,
      sourcredData: sourceCredContributions.filter(
        contribution => contribution.name === member.username,
      ),
    }))
    .flat()

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      // Address is temporary hardcoded until we have
      // a proper way to get the address
      // from the user connect.
      const communityData = await getCommunity('0x')
      const contributions = req.body.data || []
      const result = await aggregateThirdPartyData(communityData, contributions)
      const files = makeFileObjects(result)
      const cid = await storeFiles(files)
      const updatedData = {
        ...communityData,
        cid,
      }
      res.statusCode = 200
      res.json({ updatedData })
    } catch (error) {
      console.error(error)
      res.statusCode = 500
      res.json({ error })
    }
  }
}

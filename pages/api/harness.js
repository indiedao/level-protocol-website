import { makeFileObjects, storeFiles } from '../../util/web3Storage'
import { getCommunity } from '../../models/community'
import { getSourcecredContributions } from '../../util/sourcecred'

export const aggregateThirdPartyData = async (
  communityData,
  sourceCredContributions,
  coordinapeEpoch,
) =>
  communityData.members
    .map(member => ({
      ...member,
      sourcredData: sourceCredContributions.filter(
        contribution => contribution.name === member.username,
      ),
      coordinapeData: [
        ...(member.coordinapeData ? member.coordinapeData : []),
        coordinapeEpoch.find(
          newEpoch =>
            newEpoch.address &&
            newEpoch.address.toLowerCase() === member.address.toLowerCase(),
        ),
      ],
    }))
    .flat()

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      // Address is temporary hardcoded until we have
      // a proper way to get the address
      // from the user connect.
      const communityData = await getCommunity('0x')
      const contributions = await getSourcecredContributions()
      const coordinape = req.body

      const result = await aggregateThirdPartyData(
        communityData,
        contributions,
        coordinape,
      )

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

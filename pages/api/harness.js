import { makeFileObjects, storeFiles } from '../../util/web3Storage'
import { getCommunities, updateCommunity } from '../../util/fauna'
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
      const communitiesResponse = await getCommunities()
      const { data, ref } = communitiesResponse[0]
      const communityData = data
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

      await updateCommunity(ref, updatedData)
      res.statusCode = 200
      res.json({ updatedData })
    } catch (error) {
      console.error(error)
      res.statusCode = 500
      res.json({ error })
    }
  }
}

export default handler

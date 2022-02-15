import { makeFileObjects, storeFiles } from '../../../util/web3Storage'
import { getCommunity } from '../../../util/fauna'

export const aggregateThirdPartyData = async (communityData, coordinapeEpoch) =>
  communityData.members
    .map(member => ({
      ...member,
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
      const coordinape = req.body

      const result = await aggregateThirdPartyData(communityData, coordinape)

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

import { makeFileObjects, storeFiles } from '../../../util/web3Storage'
import { getCommunity } from '../../../util/fauna'

export const aggregateThirdPartyData = async (
  communityMembers,
  coordinapeEpoch,
) =>
  communityMembers
    .map(member => ({
      ...member,
      coordinapeData: [
        ...(member.coordinapeData ? member.coordinapeData : []),
        coordinapeEpoch.find(
          newEpoch =>
            newEpoch.address &&
            newEpoch.address.toLowerCase() === member.ens.toLowerCase(),
        ),
      ],
    }))
    .flat()

const CoordinapeIntegrationAPI = async (req, res) => {
  if (req.method === 'POST') {
    try {
      // Address is temporary hardcoded until we have
      // a proper way to get the address
      // from the user connect.
      const { community } = await getCommunity('0x')
      const { contributions } = req.body

      const result = await aggregateThirdPartyData(
        community.members.data,
        contributions,
      )

      const files = makeFileObjects(result)
      const cid = await storeFiles(files)

      const updatedCommunity = {
        ...community,
        cid,
      }

      res.statusCode = 200
      res.json({ updatedCommunity })
    } catch (error) {
      console.error(error) // eslint-disable-line no-console
      res.statusCode = 500
      res.json({ error })
    }
  }
}

export default CoordinapeIntegrationAPI

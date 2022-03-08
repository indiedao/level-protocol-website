import { makeFileObjects, storeFiles } from '../../../util/web3Storage'
import { getCommunity } from '../../../util/fauna'

export const aggregateThirdPartyData = async (
  communityMembers,
  sourceCredContributions,
) =>
  communityMembers
    .map(member => ({
      ...member,
      sourcredData: sourceCredContributions.filter(
        contribution => contribution.name === member.username,
      ),
    }))
    .flat()

const SourcecredIntegrationAPI = async (req, res) => {
  if (req.method === 'POST') {
    try {
      // Address is temporary hardcoded until we have
      // a proper way to get the address
      // from the user connect.
      const { community } = await getCommunity('0x')
      const contributions = req.body.data || []
      const result = await aggregateThirdPartyData(
        community.members.data,
        contributions,
      )
      const files = makeFileObjects(result)
      const cid = await storeFiles(files)
      const updatedData = {
        ...community,
        cid,
      }

      res.statusCode = 200
      res.json({ updatedData })
    } catch (error) {
      console.error(error) // eslint-disable-line no-console
      res.statusCode = 500
      res.json({ error })
    }
  }
}

export default SourcecredIntegrationAPI

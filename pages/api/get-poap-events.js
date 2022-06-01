import withMethods from '../../util/api/withMethods'
import withAuth from '../../util/api/withAuth'
import withValidParams from '../../util/api/withValidParams'
import {
  findCommunityByAddress,
  updateCommunitySnapshotEns,
} from '../../util/api/fauna'

const handler = async (req, res, { auth: { address } }) => {
  // Get community id
  const { _id } = await findCommunityByAddress(address)

  // TODO: Get community poap events

  res.statusCode = 200
  return res.json({ success: true })
}

export default withAuth(withMethods(['GET'], handler))

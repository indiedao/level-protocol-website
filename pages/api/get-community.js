import withMethods from '../../util/api/withMethods'
import withAuth from '../../util/api/withAuth'
import { findCommunityByAddress } from '../../util/api/fauna'

const handler = async (req, res, { auth: { address } }) => {
  const community = await findCommunityByAddress(address)
  res.statusCode = 200
  return res.json({ success: true, data: { community } })
}

export default withAuth(withMethods(['GET'], handler))

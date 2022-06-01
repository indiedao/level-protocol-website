import withMethods from '../../util/api/withMethods'
import withAuth from '../../util/api/withAuth'
import {
  findCommunityByAddress,
  getCommunityPoapEvents,
} from '../../util/api/fauna'

const handler = async (req, res, { auth: { address } }) => {
  // Get community id
  const { _id } = await findCommunityByAddress(address)

  // Get community poap events
  const events = await getCommunityPoapEvents({ communityId: _id })

  res.statusCode = 200
  return res.json({ events })
}

export default withAuth(withMethods(['GET'], handler))

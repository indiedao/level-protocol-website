import withMethods from '../../util/api/withMethods'
import withAuth from '../../util/api/withAuth'
import withValidParams from '../../util/api/withValidParams'
import {
  findCommunityByAddress,
  updateCommunitySnapshotEns,
} from '../../util/fauna'

const handler = async (req, res, { auth: { address } }) => {
  // Get config:
  const { _id } = await findCommunityByAddress(address)

  // Create Community:
  await updateCommunitySnapshotEns({
    id: _id,
    snapshotEns: req.body.config.ens,
  })

  res.statusCode = 200
  return res.json({ success: true })
}

export default withValidParams(
  {
    integration: {
      presence: true,
    },
    'config.ens': {
      presence: true,
    },
  },
  withAuth(withMethods(['POST'], handler)),
)

import withMethods from '../../util/api/withMethods'
import withAuth from '../../util/api/withAuth'
import withValidParams from '../../util/api/withValidParams'
import { createCommunity } from '../../util/fauna'

const handler = async (req, res, { auth: { address } }) => {
  // Use placeholder members hash:
  // This is just an empty object on IPFS:
  const membersHash = 'QmfSnGmfexFsLDkbgN76Qhx2W8sxrNDobFEQZ6ER5qg2wW'

  // Create Community:
  await createCommunity({
    name: req.body.name,
    address,
    membersHash,
  })

  res.statusCode = 200
  return res.json({ success: true })
}

export default withValidParams(
  {
    name: {
      presence: true,
    },
  },
  withAuth(withMethods(['POST'], handler)),
)

import withMethods from '../../util/api/withMethods'
import withAuth from '../../util/api/withAuth'
import withValidParams from '../../util/api/withValidParams'
import { createCommunity } from '../../util/api/fauna'

const handler = async (req, res, { auth: { address } }) => {
  // Use placeholder members hash:
  // This is just an empty object on IPFS:
  const membersHash = 'QmfSnGmfexFsLDkbgN76Qhx2W8sxrNDobFEQZ6ER5qg2wW'

  // Create Community:
  await createCommunity({
    address,
    createdAt: new Date(),
    name: req.body.name,
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

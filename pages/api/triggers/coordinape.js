import withAuth from '../../../util/api/withAuth'
import withMethods from '../../../util/api/withMethods'

const handler = async (req, res, { auth: { address } }) => {
  console.log(address, req.body)
  res.statusCode = 200
  return res.json({ success: true })
}

export default withAuth(withMethods(['POST'], handler))

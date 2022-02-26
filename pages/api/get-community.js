import withMethods from '../../util/api/withMethods'
import withAuth from '../../util/api/withAuth'
import { createCommunity } from '../../util/fauna'

const handler = async (req, res, { auth: { address } }) => {
  console.log('getting community')

  res.statusCode = 200
  return res.json({ success: true })
}

export default withAuth(withMethods(['GET'], handler))

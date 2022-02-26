import etl from '../../../util/integrations/snapshot/etl'
import withAuth from '../../../util/api/withAuth'
import withMethods from '../../../util/api/withMethods'

const handler = async (req, res, { auth: { address } }) => {
  // TODO: build queue/streaming infra:
  await etl(address)
  res.statusCode = 200
  return res.json({ success: true })
}

export default withAuth(withMethods(['POST'], handler))

import withMethods from '../../util/api/withMethods'
import withValidParams from '../../util/api/withValidParams'
import { findMemberByAddress } from '../../util/fauna'

const handler = async (req, res) => {
  const member = await findMemberByAddress(req.body.address)
  res.statusCode = 200
  return res.json({ success: true, data: { member } })
}

export default withValidParams(
  {
    address: {
      presence: true,
    },
  },
  withMethods(['POST'], handler),
)

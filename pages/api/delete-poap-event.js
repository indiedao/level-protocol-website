import withMethods from '../../util/api/withMethods'
import withAuth from '../../util/api/withAuth'
import withValidParams from '../../util/api/withValidParams'
import { deleteCommunityPoapEvent } from '../../util/api/fauna'

const handler = async (req, res) => {
  const { id } = req.body

  await deleteCommunityPoapEvent({ id })

  res.statusCode = 200
  return res.json({ success: true })
}

export default withValidParams(
  {
    id: {
      presence: true,
    },
  },
  withAuth(withMethods(['POST'], handler)),
)

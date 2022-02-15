import { getCommunityByAdmin } from '../../../util/fauna'

export default async (req, res) => {
  const { address } = req.query
  const { community } = await getCommunityByAdmin(address)

  res.statusCode = 200
  return res.json({
    community,
  })
}

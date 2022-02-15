import { getCommunityByAdmin } from '../../../util/fauna'

export default async (req, res) => {
  if (req.method === 'GET') {
    const { address } = req.query
    const { community } = await getCommunityByAdmin(address)

    res.statusCode = 200
    return res.json({
      community,
    })
  }
  return false
}

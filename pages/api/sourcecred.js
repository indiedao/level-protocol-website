import { getSourcecredContributions } from '../../util/sourcecred'

export default async (req, res) => {
  if (req.method === 'GET') {
    const data = await getSourcecredContributions()
    res.statusCode = 200

    res.json({
      data,
    })
  }
}

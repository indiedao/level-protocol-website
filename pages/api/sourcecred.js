import { getSourcecredContributions } from '../../util/sourcecred'

export default async (req, res) => {
  if (req.method === 'GET') {
    try {
      const data = await getSourcecredContributions()
      res.statusCode = 200
      res.json({
        data,
      })
    } catch (error) {
      console.log(error)
      res.statusCode = 500
      res.json({ error })
    }
  }
}

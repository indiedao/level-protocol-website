import { getSourcecredContributions } from '../../util/sourcecred'

const SourcecredAPI = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const data = await getSourcecredContributions()
      res.statusCode = 200
      res.json({
        data,
      })
    } catch (error) {
      console.log(error) // eslint-disable-line no-console
      res.statusCode = 500
      res.json({ error })
    }
  }
}

export default SourcecredAPI

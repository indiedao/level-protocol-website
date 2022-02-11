import { getSourcecredContributions } from '../../../util/sourcecred'
import axios from 'axios'

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      const contributions = await getSourcecredContributions()
      const url = `http://${req.headers.host}/api/integration/sourcecred`
      const { data } = await axios.post(url, {
        contributions,
      })
      res.send({ data })
    } catch (error) {
      console.error(error)
      res.statusCode = 500
      res.json({ error })
    }
  }
}

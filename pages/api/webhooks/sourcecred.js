import axios from 'axios'
import { getSourcecredContributions } from '../../../util/sourcecred'

const SourcecredWebhook = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const contributions = await getSourcecredContributions()
      const url = `http://${req.headers.host}/api/integrations/sourcecred`
      const { data } = await axios.post(url, {
        contributions,
      })
      res.send({ data })
    } catch (error) {
      console.error(error) // eslint-disable-line no-console
      // res.statusCode = 500
      // res.json({ error })
    }
  }
}

export default SourcecredWebhook

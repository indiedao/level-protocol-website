import axios from 'axios'

const CoordinapeWebhook = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const contributions = req.body
      const url = `http://${req.headers.host}/api/integrations/coordinape`
      const { data } = await axios.post(url, {
        contributions,
      })
      res.send({ data })
    } catch (error) {
      console.error(error) // eslint-disable-line no-console
      res.statusCode = 500
      res.json({ error })
    }
  }
}

export default CoordinapeWebhook

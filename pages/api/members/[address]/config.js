import { getMemberConfig } from '../../../../models/memberConfig'

const handler = async (req, res) => {
  if (req.method === 'GET') {
    const { address } = req.query
    const memberConfig = await getMemberConfig(address)

    res.statusCode = 200
    return res.json({
      memberConfig,
    })
  }
  return false
}

export default handler

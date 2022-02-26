import etl from '../../../util/integrations/snapshot/etl'

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    res.statusCode = 404
    res.json({ error: 'Not Found' })
  }

  try {
    // Check signature:
    // TODO: abstract into auth layer
    // TODO: check for auth params
    console.log(req.body.message, req.body.sig, req.body.address)
    // TODO: use dao address from auth check here:
    const dao = '0x762C0cefBdC51D3ca0553b81792D82fcA96EF7a3' // IndieDAO

    // TODO: build queue/streaming infra:
    await etl(dao)

    res.statusCode = 200
    res.json({ success: true })
  } catch (error) {
    console.error(error)
    res.statusCode = 500
    res.json({ error: 'Unknown Server Error' })
  }
}

export default handler

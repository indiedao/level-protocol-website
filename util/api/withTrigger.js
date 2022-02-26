const withTrigger = handler => {
  return async (req, res) => {
    // Only handle POST requests:
    if (req.method !== 'POST') {
      res.statusCode = 404
      return res.json({ error: 'Not Found' })
    }

    try {
      // Check signature:
      // TODO: abstract into auth layer
      // TODO: check for auth params
      console.log(req.body.message, req.body.sig, req.body.address)
      // TODO: use dao address from auth check here:
      const dao = '0x762C0cefBdC51D3ca0553b81792D82fcA96EF7a3' // IndieDAO

      await handler({ dao })
      res.statusCode = 200
      return res.json({ success: true })
    } catch (error) {
      // Error handling:
      console.error(error)
      res.statusCode = 500
      return res.json({ error: 'Unknown Server Error' })
    }
  }
}

export default withTrigger

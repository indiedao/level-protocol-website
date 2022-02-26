const withMethods = (methods, handler) => {
  return async (req, res, opts = {}) => {
    // Error if wrong method type:
    if (!methods.includes(req.method)) {
      res.statusCode = 404
      return res.json({ error: 'Not Found' })
    }

    // Resume handler:
    return handler(req, res, opts)
  }
}

export default withMethods

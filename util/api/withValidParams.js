import validate from 'validate.js'

const withMethods = (validationConfig, handler) => {
  return async (req, res, opts = {}) => {
    const validationErrors = validate(req.body, validationConfig, {
      format: 'flat',
    })

    // Error if invalid params:
    if (validationErrors) {
      res.statusCode = 500
      return res.json({
        error: validationErrors,
      })
    }

    // Resume handler:
    return handler(req, res, opts)
  }
}

export default withMethods

import jwt from 'jsonwebtoken'
import { utils } from 'ethers'

class AuthenticationError extends Error {
  constructor(message) {
    super(message)
    this.name = 'AuthenticationError'
  }
}

const withAuth = handler => {
  return async (req, res, opts = {}) => {
    try {
      // Unpack JWT:
      const bearerToken = req.headers.authorization?.split(' ')[1]
      if (!bearerToken) {
        throw new AuthenticationError('Authorization token is missing!')
      }
      const { sig, address } = await jwt.verify(
        bearerToken,
        'lvlprotocol', // public key
      )

      // Check wallet signature:
      const message = `I am signing into lvl protocol as ${address}`
      const recovered = utils.verifyMessage(message, sig)
      if (address !== recovered) {
        throw new AuthenticationError('Authorization siganture is invalid!')
      }

      // Resume Handler:
      return handler(req, res, { ...opts, auth: { address } })
    } catch (error) {
      console.error(error) // eslint-disable-line no-console
      if (error instanceof AuthenticationError) {
        res.statusCode = 403
        return res.json({ error: error.message })
      }
      res.statusCode = 500
      return res.json({ error: 'withAuth: Unknown Server Error' })
    }
  }
}

export default withAuth

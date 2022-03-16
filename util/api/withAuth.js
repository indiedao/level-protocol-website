import jwt from 'jsonwebtoken'
import { utils } from 'ethers'

const withAuth = handler => {
  return async (req, res, opts = {}) => {
    try {
      // Unpack JWT:
      const bearerToken = req.headers.authorization.split(' ')[1]
      const { sig, address } = await jwt.verify(
        bearerToken,
        'lvlprotocol', // public key
      )

      // Check wallet signature:
      const message = `I am signing into lvl protocol as ${address}`
      const recovered = utils.verifyMessage(message, sig)
      if (address !== recovered) throw new Error('withAuth: Invalid signature!')

      // Resume Handler:
      return handler(req, res, { ...opts, auth: { address } })
    } catch (error) {
      console.error(error)
      res.statusCode = 500
      return res.json({ error: 'withAuth: Unknown Server Error' })
    }
  }
}

export default withAuth

import { utils } from 'ethers'
import withValidParams from './withValidParams'

const withAuth = handler => {
  return withValidParams(
    {
      sig: { presence: true },
      address: { presence: true },
    },
    async (req, res, opts = {}) => {
      try {
        const { sig, address } = req.body

        // Check signature:
        const message = `I am signing into lvl protocol as ${address}`
        const recovered = utils.verifyMessage(message, sig)
        if (address !== recovered)
          throw new Error('withAuth: Invalid signature!')

        // Resume Handler:
        return handler(req, res, { ...opts, auth: { address } })
      } catch (error) {
        console.error(error)
        res.statusCode = 500
        return res.json({ error: 'withAuth: Unknown Server Error' })
      }
    },
  )
}

export default withAuth

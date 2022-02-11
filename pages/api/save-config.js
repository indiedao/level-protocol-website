import { utils } from 'ethers'

const saveConfig = async (req, res) => {
  try {
    const { address, message, signature } = req.body

    await verifySignature({ address, message, signature })

    res.statusCode = 200
    res.json({ success: true })
  } catch (error) {
    console.log('🚀 ~ file: save-config.js ~ line 10 ~ saveConfig ~ error', error)
  }
}

async function verifySignature({ address, message, signature }) {
  const recovered = utils.verifyMessage(message, signature)

  if (address !== recovered) throw new Error('Invalid signer!')
}

export default saveConfig

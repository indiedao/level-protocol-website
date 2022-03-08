import { utils } from 'ethers'
import { getNftContract } from '../../util/contract'
import { createMemberConfig } from '../../util/fauna'

async function verifyOwnership({ address, nftAddress, nftId }) {
  // Allow 0x0 for custom lvl PFP:
  if (nftAddress === '0x0') return true

  const contract = getNftContract(nftAddress)
  const owner = await contract.ownerOf(nftId)

  if (owner !== address) throw new Error(`Invalid owner of ${nftId}!`)

  return true
}

async function verifySignature({ message, signature, address }) {
  const recovered = utils.verifyMessage(message, signature)

  if (address !== recovered) throw new Error('Invalid signer!')
}

const saveConfig = async (req, res) => {
  try {
    const {
      address,
      message,
      signature,
      nftId,
      nftAddress,
      colorHue,
      colorLightness,
    } = JSON.parse(req.body)

    await verifySignature({ address, message, signature })

    await verifyOwnership({ address, nftAddress, nftId })

    await createMemberConfig({
      address,
      message,
      signature,
      nftId,
      nftAddress,
      colorHue,
      colorLightness,
    })

    res.statusCode = 200
    res.json({ success: true })
  } catch (error) {
    console.log('~ file: save-config.js ~ line 12 ~ saveConfig ~ error', error) // eslint-disable-line no-console
    res.status(500).json({ error: 'Failed to save config!' })
  }
}

export default saveConfig

import { utils } from 'ethers'
import { getNftContract } from '../../util/contract'
import { createMemberConfig } from '../../util/fauna'

async function verifyOwnership({ address, nftAddress, nftId }) {
  const contract = getNftContract(nftAddress)
  const owner = await contract.ownerOf(nftId)

  if (owner !== address) throw new Error(`Invalid owner of ${nftId}!`)
}

async function verifySignature({ message, signature, address }) {
  const recovered = utils.verifyMessage(message, signature)

  if (address !== recovered) throw new Error('Invalid signer!')
}

const saveConfig = async (req, res) => {
  try {
    const { address, message, signature, nftId, nftAddress, ens } = JSON.parse(
      req.body,
    )

    await verifySignature({ address, message, signature })

    await verifyOwnership({ address, nftAddress, nftId })

    await createMemberConfig({
      address,
      message,
      signature,
      nftId,
      nftAddress,
      ens,
    })

    res.statusCode = 200
    res.json({ success: true })
  } catch (error) {
    console.log('~ file: save-config.js ~ line 12 ~ saveConfig ~ error', error)
    res.statusCode = 200
    res.json({ success: false })
  }
}

export default saveConfig

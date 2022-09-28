import withMethods from '../../util/api/withMethods'
import withAuth from '../../util/api/withAuth'
import withValidParams from '../../util/api/withValidParams'
import { getNftContract } from '../../util/contract'
import { createMember, findMemberByAddress } from '../../util/api/fauna'

async function verifyOwnership({ address, nftAddress, nftId }) {
  // Allow 0x0 for custom lvl PFP:
  if (nftAddress === '0x0') return true

  const contract = getNftContract(nftAddress)
  const owner = await contract.ownerOf(nftId)

  if (owner !== address) throw new Error(`Invalid owner of ${nftId}!`)

  return true
}

const handler = async (req, res, { auth: { address } }) => {
  const { nftId, nftAddress, colorHue, colorLightness } = req.body

  await verifyOwnership({ address, nftAddress, nftId })

  try {
    await createMember({
      address,
      createdAt: new Date(),
      nftId,
      nftAddress,
      colorHue,
      colorLightness,
    })

    res.statusCode = 200
    res.json({ success: true })
  } catch (error) {
    const errorCode = error.response.errors[0].extensions.code

    if (errorCode === 'instance not unique') {
      const member = await findMemberByAddress(address)

      res.json({ success: false, data: member })
    } else {
      res.statusCode = 500
      res.json({ success: false, error: error.message })
    }
  }
}

export default withValidParams(
  {
    nftId: {
      presence: true,
    },
    nftAddress: {
      presence: true,
    },
    colorHue: {
      presence: true,
    },
    colorLightness: {
      presence: true,
    },
  },
  withAuth(withMethods(['POST'], handler)),
)

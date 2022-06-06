import { fetchNFTSrc, provider } from '../../util/api/alchemy'
import withMethods from '../../util/api/withMethods'
import withValidParams from '../../util/api/withValidParams'
import { findMemberByAddress, updateMemberCache } from '../../util/api/fauna'

const handler = async (req, res) => {
  const { address } = req.body

  try {
    // Get existing member data:
    const { _id, nftAddress, nftId } = await findMemberByAddress(address)

    // Lookup NFT media source:
    const nftSrc = await fetchNFTSrc({ address: nftAddress, id: nftId })

    // Lookup ENS domain:
    const ens = (await provider.lookupAddress(address)) || ''

    // Update cached fields:
    await updateMemberCache({ id: _id, nftSrc, ens })

    res.statusCode = 200
    res.json({ success: true })
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e)
    res.statusCode = 500
    res.json({ success: false })
  }
}

export default withValidParams(
  {
    address: {
      presence: true,
    },
  },
  withMethods(['POST'], handler),
)

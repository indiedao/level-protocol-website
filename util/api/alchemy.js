import { createAlchemyWeb3 } from '@alch/alchemy-web3'
import { AlchemyProvider } from '@ethersproject/providers'
import { AlchemyApiKey, HTTPRPC, Network } from '../constants'

export const provider = new AlchemyProvider(Network.name, AlchemyApiKey)
export const web3 = createAlchemyWeb3(HTTPRPC)

export const fetchNFTSrc = async ({ address, id }) => {
  // Handle hard coded LVL nft images:
  if (address === '0x0') {
    return `/pfps/default-${id}.jpg`
  }

  // Fetch NFT src using Alchemy:
  const nft = await web3.alchemy.getNftMetadata({
    contractAddress: address,
    tokenId: id,
  })

  return nft.media[0]?.raw || '/nft-loading.gif'
}

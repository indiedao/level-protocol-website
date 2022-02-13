import { useEffect, useCallback, useState } from 'react'
import { createAlchemyWeb3 } from '@alch/alchemy-web3'
import useWeb3 from '../../hooks/useWeb3'
import useConfigurator from '../../hooks/useConfigurator'
import { HTTPRPC } from '../../../util/constants'
import { Body1 } from '../../ui/Typography'
import NFTList from '../ui/NFTList'
import NFTImage from '../ui/NFTImage'
import ConfiguratorControlsView from './ConfiguratorControlsView'

const web3 = createAlchemyWeb3(HTTPRPC)

const NFTConfiguratorView = () => {
  const [nfts, setNfts] = useState([])
  const [selectedNftKey, setSelectedNftKey] = useState()
  const [loading, setLoading] = useState(true)
  const { address } = useWeb3()
  const { nextStep, previousStep, setNft } = useConfigurator()

  const fetchNFTs = useCallback(async () => {
    if (!address) return

    setLoading(true)

    const resp = await web3.alchemy.getNfts({
      owner: address,
    })
    const _nfts = []

    for (let i = 0; i < resp.ownedNfts.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const nft = await web3.alchemy.getNftMetadata({
        contractAddress: resp.ownedNfts[i].contract.address,
        tokenId: parseInt(resp.ownedNfts[i].id.tokenId, 16),
      })
      _nfts.push(nft)
    }

    setNfts(_nfts)
    setLoading(false)
  }, [address])

  useEffect(() => {
    fetchNFTs()
  }, [fetchNFTs, address])

  if (nfts.length === 0) {
    if (loading) return <Body1>Loading your NFTs...</Body1>
    if (!loading) return <Body1>You don&apos;t have any NFTs...</Body1>
  }

  // Remove junk:
  const realNfts = nfts.filter(nft => {
    return (
      nft.contract &&
      nft.contract.address &&
      nft.id &&
      nft.id.tokenId &&
      nft.media &&
      nft.media[0] &&
      nft.media[0].uri &&
      nft.media[0].uri.raw
    )
  })

  const nftData = realNfts.map(nft => ({
    key: `${nft.contract.address}-${nft.id.tokenId}`,
    src: nft?.media?.[0].uri.raw,
    address: nft.contract.address,
    id: nft.id.tokenId,
  }))

  const handleUp = () => {
    // Handle first click:
    if (!selectedNftKey) {
      setSelectedNftKey(nftData[0].key)
      return
    }
    // Top row (do nothing):
    const selectedIndex = nftData.indexOf(
      nftData.find(nft => nft.key === selectedNftKey),
    )
    if (selectedIndex < 3) return
    // Go up one row (minus 3):
    setSelectedNftKey(nftData[selectedIndex - 3].key)
  }

  const handleDown = () => {
    // Handle first click:
    if (!selectedNftKey) {
      setSelectedNftKey(nftData[0].key)
      return
    }
    const selectedIndex = nftData.indexOf(
      nftData.find(nft => nft.key === selectedNftKey),
    )
    // Bottom row (do nothing):
    if (selectedIndex > nftData.length - 4) return
    // Go down one row (plus 3):
    setSelectedNftKey(nftData[selectedIndex + 3].key)
  }

  const handleLeft = () => {
    // Handle first click:
    if (!selectedNftKey) {
      setSelectedNftKey(nftData[0].key)
      return
    }
    const selectedIndex = nftData.indexOf(
      nftData.find(nft => nft.key === selectedNftKey),
    )
    // Left column (do nothing):
    if (selectedIndex % 3 === 0) return
    // Go left one (minus 1):
    setSelectedNftKey(nftData[selectedIndex - 1].key)
  }

  const handleRight = () => {
    // Handle first click:
    if (!selectedNftKey) {
      setSelectedNftKey(nftData[0].key)
      return
    }
    const selectedIndex = nftData.indexOf(
      nftData.find(nft => nft.key === selectedNftKey),
    )
    // End of selection but not row (do nothing):
    if (selectedIndex === nftData.length - 1) return
    // Right column (do nothing):
    if (selectedIndex % 3 === 2) return
    // Go right one (plus 1):
    setSelectedNftKey(nftData[selectedIndex + 1].key)
  }

  return (
    <div>
      <NFTList>
        {nftData.map(nft => (
          <div key={nft.key}>
            <NFTImage
              src={nft.src}
              selected={selectedNftKey === nft.key}
              onClick={() => {
                setNft({ address: nft.address, id: nft.id })
                setSelectedNftKey(nft.key)
              }}
            />
          </div>
        ))}
      </NFTList>
      <ConfiguratorControlsView
        up={handleUp}
        down={handleDown}
        right={handleRight}
        left={handleLeft}
        a={nextStep}
        b={previousStep}
      />
    </div>
  )
}

export default NFTConfiguratorView

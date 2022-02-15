import { useEffect, useCallback, useState } from 'react'
import { createAlchemyWeb3 } from '@alch/alchemy-web3'
import useWeb3 from '../../hooks/useWeb3'
import useConfigurator from '../../hooks/useConfigurator'
import { HTTPRPC } from '../../../util/constants'
import { Body1 } from '../../ui/Typography'
import ConfiguratorControlsView from './ConfiguratorControlsView'
import TokenView from '../../token/view/TokenView'
import ConfiguratorContainer from '../ui/ConfiguratorContainer'
import ConfiguratorScreen from '../ui/ConfiguratorScreen'
import ConfiguratorNavView from './ConfiguratorNavView'

const web3 = createAlchemyWeb3(HTTPRPC)
const DEFAULT_NFTS = []

for (let i = 0; i < 2; i += 1) {
  DEFAULT_NFTS.push({
    id: i,
    address: '0x0',
    src: `/pfps/default-${i}.png`,
    key: `0x0-${i}`,
  })
}

const NFTConfiguratorView = () => {
  const [nfts, setNfts] = useState(DEFAULT_NFTS)
  const [selectedNftIndex, setSelectedNftIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const { address } = useWeb3()
  const { nextStep, previousStep, setNft, setStatusIndicator } =
    useConfigurator()

  useEffect(() => {
    const nft = nfts[selectedNftIndex]
    setNft(nft)
  }, [selectedNftIndex, nfts, setNft])

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

    // Remove junk:
    const realNfts = _nfts.filter(nft => {
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

    const formattedNfts = realNfts.map(nft => ({
      key: `${nft.contract.address}-${nft.id.tokenId}`,
      src: nft?.media?.[0].uri.raw,
      address: nft.contract.address,
      id: nft.id.tokenId,
    }))

    setNfts([...DEFAULT_NFTS, ...formattedNfts])
    setLoading(false)
  }, [address])

  // Load NFTs when deps change:
  useEffect(() => {
    fetchNFTs()
  }, [fetchNFTs, address])

  // Update status indicator on loading and nft changes:
  useEffect(() => {
    let message
    if (loading) {
      message = 'loading your NFTs'
    } else {
      message = `${selectedNftIndex + 1}/${nfts.length}`
    }
    setStatusIndicator({
      message,
    })
  }, [setStatusIndicator, selectedNftIndex, nfts.length, loading])

  if (nfts.length === 0) {
    if (loading) return <Body1>Loading your NFTs...</Body1>
    if (!loading) return <Body1>You don&apos;t have any NFTs...</Body1>
  }

  const handleLeft = () => {
    // Beginning (go to end):
    if (selectedNftIndex === 0) {
      setSelectedNftIndex(nfts.length - 1)
      return
    }
    // Go left one (minus 1):
    setSelectedNftIndex(selectedNftIndex - 1)
  }

  const handleRight = () => {
    // End (go to beginning):
    if (selectedNftIndex === nfts.length - 1) {
      setSelectedNftIndex(0)
      return
    }
    // Go right one (plus 1):
    setSelectedNftIndex(selectedNftIndex + 1)
  }

  return (
    <ConfiguratorContainer>
      <ConfiguratorScreen>
        <ConfiguratorNavView />
        <div>
          <TokenView
            address={address}
            nftId={nfts[selectedNftIndex].id}
            nftAddress={nfts[selectedNftIndex].address}
          />
        </div>
      </ConfiguratorScreen>
      <ConfiguratorControlsView
        right={handleRight}
        left={handleLeft}
        a={nextStep}
        b={previousStep}
      />
    </ConfiguratorContainer>
  )
}

export default NFTConfiguratorView

import { useRef, useEffect, useState, useCallback } from 'react'
import { createAlchemyWeb3 } from '@alch/alchemy-web3'
import styled from 'styled-components'
import Pyramid from '../../Pyramid'
import { HTTPRPC } from '../../../util/constants'
import useEns from '../../hooks/useEns'
import useTruncatedAddress from '../../hooks/useTruncatedAddress'
import PFP from '../ui/PFP'
import PixelCard from '../ui/PixelCard'
import TokenContainer from '../ui/TokenContainer'
import { Body1 } from '../../ui/Typography'

const web3 = createAlchemyWeb3(HTTPRPC)

const TokenView = ({
  address,
  nftId,
  nftAddress,
  colorHue,
  colorLightness,
  backgroundColor,
}) => {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [nftSrc, setNftSrc] = useState('/nft-loading.gif')
  const { ens } = useEns(address)
  const { truncatedAddress } = useTruncatedAddress(address)
  const container = useRef()

  const fetchNft = useCallback(async () => {
    // Using lvl pfp:
    if (nftAddress === '0x0') {
      setNftSrc(`/pfps/default-${nftId}.jpg`)
      return
    }

    const nft = await web3.alchemy.getNftMetadata({
      contractAddress: nftAddress,
      tokenId: nftId,
    })
    setNftSrc(nft.media[0].uri.raw)
  }, [nftId, nftAddress])

  useEffect(() => {
    setWidth(container.current.parentElement.clientWidth)
    setHeight(container.current.parentElement.clientHeight)
  }, [])

  useEffect(() => {
    fetchNft()
  }, [nftId, nftAddress, fetchNft])

  return (
    <PixelCard color={`hsl(${colorHue}deg, 100%, ${colorLightness}%)`}>
      <TokenContainer ref={container} width={width} height={height}>
        <PFP src={nftSrc} />
        <EnsAddress color={`hsl(${colorHue}deg, 100%, ${colorLightness}%)`}>
          {ens || truncatedAddress}
        </EnsAddress>
        <Pyramid
          width={width}
          height={height}
          backgroundColor={backgroundColor}
        />
      </TokenContainer>
    </PixelCard>
  )
}

const EnsAddress = styled(Body1)`
  color: ${({ color }) => color};
`

export default TokenView

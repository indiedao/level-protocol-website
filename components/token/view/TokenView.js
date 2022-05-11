import { useEffect, useState, useCallback } from 'react'
import { createAlchemyWeb3 } from '@alch/alchemy-web3'
import styled from 'styled-components'

import Pyramid from '../ui/Pyramid'
import { HTTPRPC } from '../../../util/constants'
import useEns from '../../hooks/useEns'
import useTruncatedAddress from '../../hooks/useTruncatedAddress'
import PFP from '../ui/PFP'
import PixelCard from '../ui/PixelCard'
import { H4 } from '../../ui/AltTypography'

const web3 = createAlchemyWeb3(HTTPRPC)

const TokenContainer = styled.div`
  position: relative;
  display: grid;
  justify-items: center;
  grid-template-columns: 1fr;
  grid-template-rows: min-content 1fr min-content;
  padding-top: clamp(0.8rem, 2.666vw, 1.6rem);
`

const TokenView = ({
  address,
  nftId,
  nftAddress,
  colorHue,
  colorLightness,
  backgroundColor,
}) => {
  const [nftSrc, setNftSrc] = useState('/nft-loading.gif')
  const { ens } = useEns(address)
  const { truncatedAddress } = useTruncatedAddress(address)
  const color = colorHue
    ? `hsl(${colorHue}deg, 100%, ${colorLightness}%)`
    : undefined

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
    setNftSrc(nft.media[0].raw)
  }, [nftId, nftAddress])

  useEffect(() => {
    fetchNft()
  }, [nftId, nftAddress, fetchNft])

  return (
    <PixelCard color={color}>
      <TokenContainer>
        <PFP src={nftSrc} />
        <Pyramid backgroundColor={backgroundColor} />
        <H4 color="vibrantPixel" style={{ color }}>
          {ens || truncatedAddress}
        </H4>
      </TokenContainer>
    </PixelCard>
  )
}

export default TokenView

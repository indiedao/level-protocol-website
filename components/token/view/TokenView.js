import styled from 'styled-components'

import Pyramid from '../ui/Pyramid'
import useTruncatedAddress from '../../hooks/useTruncatedAddress'
import PFP from '../ui/PFP'
import PixelCard from '../ui/PixelCard'
import { H4 } from '../../ui/AltTypography'

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
  nftSrc,
  ens,
  colorHue,
  colorLightness,
  backgroundColor,
}) => {
  const { truncatedAddress } = useTruncatedAddress(address)
  const color = colorHue
    ? `hsl(${colorHue}deg, 100%, ${colorLightness}%)`
    : undefined

  return (
    <PixelCard color={color}>
      <TokenContainer>
        <PFP src={nftSrc || '/nft-loading.gif'} />
        <Pyramid backgroundColor={backgroundColor} />
        <H4 color="vibrantPixel" style={{ color }}>
          {ens || truncatedAddress}
        </H4>
      </TokenContainer>
    </PixelCard>
  )
}

export default TokenView

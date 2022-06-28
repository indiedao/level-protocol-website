import { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import Pyramid from '../../Pyramid'
import useTruncatedAddress from '../../hooks/useTruncatedAddress'
import PFP from '../ui/PFP'
import PixelCard from '../ui/PixelCard'
import TokenContainer from '../ui/TokenContainer'
import { Body1 } from '../../ui/Typography'

const TokenView = ({
  address,
  nftSrc,
  ens,
  colorHue,
  colorLightness,
  backgroundColor,
}) => {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const src = nftSrc || '/nft-loading.gif'
  const { truncatedAddress } = useTruncatedAddress(address)
  const container = useRef()

  useEffect(() => {
    setWidth(container.current.parentElement.clientWidth)
    setHeight(container.current.parentElement.clientHeight)
  }, [])

  return (
    <PixelCard color={`hsl(${colorHue}deg, 100%, ${colorLightness}%)`}>
      <TokenContainer ref={container} height={height}>
        <PFP src={src} />
        <Pyramid
          width={width}
          height={height}
          backgroundColor={backgroundColor}
        />
        <EnsAddress color={`hsl(${colorHue}deg, 100%, ${colorLightness}%)`}>
          {ens || truncatedAddress}
        </EnsAddress>
      </TokenContainer>
    </PixelCard>
  )
}

const EnsAddress = styled(Body1)`
  color: ${({ color }) => color};
  background-color: ${props => props.theme.colors.vibrantScreen};
  padding: 8px 10px;
  height: 40px;
  font-family: Alagard;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 24px;
  border-radius: 8px;
  position: absolute;
  bottom: 25px;
`

export default TokenView

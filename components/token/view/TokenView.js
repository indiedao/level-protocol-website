import { useRef, useEffect, useState } from 'react'
import Pyramid from '../../Pyramid'
import useEns from '../../hooks/useEns'
import PFP from '../ui/PFP'
import TokenContainer from '../ui/TokenContainer'
import { Body1 } from '../../ui/Typography'

const TokenView = ({ address, nft }) => {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const { ens } = useEns(address)
  const container = useRef()

  useEffect(() => {
    setWidth(container.current.parentElement.clientWidth)
    setHeight(container.current.parentElement.clientHeight)
  }, [])

  return (
    <TokenContainer ref={container} width={width} height={height}>
      <PFP src={nft.src} />
      <Body1>{ens || address}</Body1>
      <Pyramid width={width} height={height} />
    </TokenContainer>
  )
}

export default TokenView

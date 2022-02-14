import Pyramid from '../../Pyramid'
import useEns from '../../hooks/useEns'
import PFP from '../ui/PFP'
import TokenContainer from '../ui/TokenContainer'
import { Body1 } from '../../ui/Typography'

const TokenView = ({ address, nft }) => {
  const { ens } = useEns(address)

  return (
    <TokenContainer width={300} height={400}>
      <PFP src={nft.src} />
      <Body1>{ens || address}</Body1>
      <Pyramid />
    </TokenContainer>
  )
}

export default TokenView

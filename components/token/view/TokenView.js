import Pyramid from '../../Pyramid'
import useEns from '../../hooks/useEns'
import PFP from '../ui/PFP'

const TokenView = ({ address, nft }) => {
  const { ens } = useEns(address)

  return (
    <div>
      <PFP src={nft.src} />
      {ens || address}
      <Pyramid />
    </div>
  )
}

export default TokenView

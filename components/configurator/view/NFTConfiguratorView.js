import useConfigurator from '../../hooks/useConfigurator'
import NFTListView from './NFTListView'

const NFTConfiguratorView = () => {
  const { setNft } = useConfigurator()

  return (
    <div>
      <NFTListView handleSelect={nft => setNft(nft)} />
    </div>
  )
}

export default NFTConfiguratorView

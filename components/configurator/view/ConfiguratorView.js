import useConfigurator from '../../hooks/useConfigurator'
import ConnectView from './ConnectView'
import NFTView from './NFTView'
import ColorView from './ColorView'
import SaveView from './SaveView'
import useWeb3 from '../../hooks/useWeb3'

const ConfiguratorView = () => {
  const { currentStep } = useConfigurator()
  const { address, networkError } = useWeb3()

  if (!address || networkError) return <ConnectView />

  switch (currentStep) {
    case 'NFT':
      return <NFTView />
    case 'COLOR':
      return <ColorView />
    case 'SAVE':
      return <SaveView />
    default:
      throw new Error(`Unknown configurator step: ${currentStep}!`)
  }
}

export default ConfiguratorView

import useConfigurator from '../../hooks/useConfigurator'
import ConnectConfiguratorView from './ConnectConfiguratorView'
import NFTConfiguratorView from './NFTConfiguratorView'
import ColorConfiguratorView from './ColorConfiguratorView'
import SaveConfiguratorView from './SaveConfiguratorView'
import useWeb3 from '../../hooks/useWeb3'

const ConfiguratorView = () => {
  const { currentStep } = useConfigurator()
  const { address, networkError } = useWeb3()

  if (!address || networkError) return <ConnectConfiguratorView />

  switch (currentStep) {
    case 'NFT':
      return <NFTConfiguratorView />
    case 'COLOR':
      return <ColorConfiguratorView />
    case 'SAVE':
      return <SaveConfiguratorView />
    default:
      throw new Error(`Unknown configurator step: ${currentStep}!`)
  }
}

export default ConfiguratorView

import useConfigurator from '../../hooks/useConfigurator'
import NFTConfiguratorView from './NFTConfiguratorView'
import ColorConfiguratorView from './ColorConfiguratorView'
import SaveConfiguratorView from './SaveConfiguratorView'

const ConfiguratorView = () => {
  const { currentStep } = useConfigurator()

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

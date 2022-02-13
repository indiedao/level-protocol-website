import styled from 'styled-components'
import useWeb3 from '../../hooks/useWeb3'
import useConfigurator from '../../hooks/useConfigurator'
import { Body1 } from '../../ui/Typography'
import NFTConfiguratorView from './NFTConfiguratorView'
import ColorConfiguratorView from './ColorConfiguratorView'
import SaveConfiguratorView from './SaveConfiguratorView'
import ConfiguratorNavView from './ConfiguratorNavView'

const ConfiguratorView = () => {
  const { address, networkError } = useWeb3()
  const { currentStep } = useConfigurator()

  if (!address || networkError) {
    return <Body1>Please connect to your wallet.</Body1>
  }

  function getStepComponent() {
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

  return (
    <Wrapper>
      <ConfiguratorNavView />
      {getStepComponent()}
    </Wrapper>
  )
}

const Wrapper = styled.div``

export default ConfiguratorView

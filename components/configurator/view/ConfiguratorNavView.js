import useConfigurator from '../../hooks/useConfigurator'
import ConfiguratorNavContainer from '../ui/ConfiguratorNavContainer'
import NavItem from '../ui/NavItem'

const ConfiguratorNavView = () => {
  const { flow, currentStep, setStep } = useConfigurator()

  return (
    <ConfiguratorNavContainer>
      <NavItem onClick={() => setStep('NFT')} active={currentStep === 'NFT'}>
        pfp
      </NavItem>
      <NavItem
        onClick={() => setStep('COLOR')}
        active={currentStep === 'COLOR'}
      >
        color
      </NavItem>
      <NavItem onClick={() => setStep('SAVE')} active={currentStep === 'SAVE'}>
        {flow === 'CONFIG' ? 'save' : 'mint'}
      </NavItem>
    </ConfiguratorNavContainer>
  )
}

export default ConfiguratorNavView

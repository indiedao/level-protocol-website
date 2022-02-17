import useConfigurator from '../../hooks/useConfigurator'
import ConfiguratorNavContainer from '../ui/ConfiguratorNavContainer'
import NavIcon from '../ui/NavIcon'

const ConfiguratorNavView = () => {
  const { flow, currentStep, setStep } = useConfigurator()

  return (
    <ConfiguratorNavContainer>
      <NavIcon
        iconName="Pfp"
        isActive={currentStep === 'NFT'}
        onClick={() => setStep('NFT')}
      />
      <NavIcon
        iconName="Color"
        isActive={currentStep === 'COLOR'}
        onClick={() => setStep('COLOR')}
      />
      <NavIcon
        iconName={flow === 'CONFIG' ? 'Save' : 'Mint'}
        isActive={currentStep === 'SAVE'}
        onClick={() => setStep('SAVE')}
      />
    </ConfiguratorNavContainer>
  )
}

export default ConfiguratorNavView

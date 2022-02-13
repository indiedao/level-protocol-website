import useConfigurator from '../../hooks/useConfigurator'
import NavItem from '../ui/NavItem'

const ConfiguratorNavView = () => {
  const {
    currentStep,
    previousStep,
    nextStep,
    setStep,
    previousStepAvailable,
    nextStepAvailable,
  } = useConfigurator()

  return (
    <div>
      {previousStepAvailable && (
        <NavItem onClick={() => previousStep()}>&lt; PREV</NavItem>
      )}
      <NavItem onClick={() => setStep('NFT')} active={currentStep === 'NFT'}>
        NFT
      </NavItem>
      <NavItem
        onClick={() => setStep('COLOR')}
        active={currentStep === 'COLOR'}
      >
        Color
      </NavItem>
      <NavItem onClick={() => setStep('SAVE')} active={currentStep === 'SAVE'}>
        Save
      </NavItem>
      {nextStepAvailable && (
        <NavItem onClick={() => nextStep()}>NEXT &gt;</NavItem>
      )}
    </div>
  )
}

export default ConfiguratorNavView

import { useState } from 'react'
import useWeb3 from '../../hooks/useWeb3'
import { Network } from '../../../util/constants'
import ConfiguratorControlsView from './ConfiguratorControlsView'
import ConfiguratorContainer from '../ui/ConfiguratorContainer'
import ConfiguratorScreen from '../ui/ConfiguratorScreen'
import ConfiguratorNavView from './ConfiguratorNavView'
import ConfiguratorPrompt from '../ui/ConfiguratorPrompt'

const MESSAGE_STEPS = [
  'The time is now for us to rebuild...',
  // eslint-disable-next-line quotes
  "it's dangerous to go alone...",
  'take this soulbound NFT and lvl up...',
]

const ConnectConfiguratorView = () => {
  const [step, setStep] = useState(0)
  const { connect, networkError, web3 } = useWeb3()

  const isLastStep = step === MESSAGE_STEPS.length - 1

  let content
  if (isLastStep && networkError) {
    // Wrong network:
    content = (
      <ConfiguratorPrompt
        message={networkError.toLowerCase()}
        action="switch"
      />
    )
  } else if (isLastStep) {
    // Connect:
    content = <ConfiguratorPrompt message="do you accept?" action="connect" />
  } else {
    // Message:
    content = <ConfiguratorPrompt message={MESSAGE_STEPS[step]} action="next" />
  }

  const handleConnect = () => {
    if (networkError) {
      try {
        web3.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: Network.hexId }],
        })
      } catch (e) {
        console.log(e) // eslint-disable-line no-console
      }
    } else {
      connect()
    }
  }

  const nextStep = () => {
    setStep(step + 1)
  }

  const handleNext = () => {
    if (isLastStep) {
      handleConnect()
    } else {
      nextStep()
    }
  }

  return (
    <ConfiguratorContainer>
      <ConfiguratorScreen>
        <ConfiguratorNavView />
        {content}
      </ConfiguratorScreen>
      <ConfiguratorControlsView right={handleNext} a={handleNext} />
    </ConfiguratorContainer>
  )
}

export default ConnectConfiguratorView

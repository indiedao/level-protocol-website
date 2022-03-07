import { useState, useEffect } from 'react'
import useWeb3 from '../../hooks/useWeb3'
import { Network } from '../../../util/constants'
import ConfiguratorControlsView from './ConfiguratorControlsView'
import ConfiguratorContainer from '../ui/ConfiguratorContainer'
import ConfiguratorScreen from '../ui/ConfiguratorScreen'
import ConfiguratorNavView from './ConfiguratorNavView'
import ConfiguratorPrompt from '../ui/ConfiguratorPrompt'
import useConfigurator from '../../hooks/useConfigurator'

const MESSAGE_STEPS = [
  'The time for us to rebuild is now...',
  // eslint-disable-next-line quotes
  "it's dangerous to go alone...",
  'take this soulbound NFT and lvl up...',
]

const ConnectConfiguratorView = () => {
  const [step, setStep] = useState(0)
  const { connect, networkError, web3 } = useWeb3()
  const { setStatusIndicator } = useConfigurator()

  const isLastStep = step === MESSAGE_STEPS.length

  let content
  if (isLastStep && networkError) {
    // Wrong network:
    content = (
      <ConfiguratorPrompt
        message={networkError.toLowerCase()}
        actionA="switch"
      />
    )
  } else if (isLastStep) {
    // Connect:
    content = <ConfiguratorPrompt message="do you accept?" actionA="connect" />
  } else {
    // Message:
    content = (
      <ConfiguratorPrompt message={MESSAGE_STEPS[step]} actionA="next" />
    )
  }

  // Setup default status indicator message:
  useEffect(() => {
    setStatusIndicator({
      message: 'not connected',
    })
  }, [setStatusIndicator])

  // Show network errors on status indicator:
  useEffect(() => {
    if (networkError) {
      setStatusIndicator({
        message: 'network error',
      })
    }
  }, [setStatusIndicator, networkError])

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

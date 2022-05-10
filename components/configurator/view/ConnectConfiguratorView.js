import { useState, useEffect } from 'react'
import useWeb3 from '../../hooks/useWeb3'
import { Network } from '../../../util/constants'
import Device from '../ui/Device'
import Screen from '../ui/Screen'
import Prompt from '../ui/Prompt'
import useConfigurator from '../../hooks/useConfigurator'
import ConfiguratorLoading from '../ui/ConfiguratorLoading'

const MESSAGE_STEPS = [
  'The time for us to rebuild is now...',
  'it’s dangerous to go alone...',
  'take this soulbound NFT and lvl up...',
]

const ConnectConfiguratorView = () => {
  const [step, setStep] = useState(0)
  const { connect, networkError, web3 } = useWeb3()
  const { setStatusIndicator } = useConfigurator()
  const [loading, setLoading] = useState(false)

  const isLastStep = step === MESSAGE_STEPS.length

  let content
  if (loading) {
    content = <ConfiguratorLoading />
  } else if (isLastStep && networkError) {
    // Wrong network:
    content = <Prompt message={networkError.toLowerCase()} actionA="switch" />
  } else if (isLastStep) {
    // Connect:
    content = <Prompt message="do you accept?" actionA="connect" />
  } else {
    // Message:
    content = <Prompt message={MESSAGE_STEPS[step]} actionA="next" />
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
      setLoading(true)
      connect().finally(() => setLoading(false))
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
    <Device right={handleNext} a={handleNext}>
      <Screen>{content}</Screen>
    </Device>
  )
}

export default ConnectConfiguratorView

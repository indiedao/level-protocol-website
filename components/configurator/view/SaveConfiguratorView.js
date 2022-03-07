import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

import useConfigurator from '../../hooks/useConfigurator'
import useWeb3 from '../../hooks/useWeb3'
import ConfiguratorControlsView from './ConfiguratorControlsView'
import ConfiguratorContainer from '../ui/ConfiguratorContainer'
import ConfiguratorScreen from '../ui/ConfiguratorScreen'
import ConfiguratorPrompt from '../ui/ConfiguratorPrompt'
import { playSound } from '../../../util/audio'

const STEPS = {
  READY: 'READY',
  SAVE: 'SAVE',
  PREMINT: 'PREMINT',
  MINT: 'MINT',
  CONFIRMATION: 'CONFIRMATION',
  ERROR: 'ERROR',
}

const STEP_STATUS_MAP = {
  READY: 'ready',
  SAVE: 'saving...',
  PREMINT: 'coming soon...',
  MINT: 'minting...',
  CONFIRMATION: 'connected',
  ERROR: 'err',
}

const SaveConfiguratorView = () => {
  const [step, setStep] = useState(STEPS.READY)
  const [donationAmount, setDonationAmount] = useState(
    ethers.utils.parseEther('0.01'),
  )
  const [errorMessage, setErrorMessage] = useState('')
  const { flow, previousStep, save, setStatusIndicator } = useConfigurator()
  const { address } = useWeb3()

  // Set status indicator message:
  useEffect(() => {
    setStatusIndicator({
      message: STEP_STATUS_MAP[step],
    })
  }, [setStatusIndicator, step])

  const handleSave = async () => {
    try {
      setStep(STEPS.SAVE)
      await save()
      playSound('page_turn.wav')
      if (flow === 'MINT') {
        setStep(STEPS.MINT)
      } else {
        setStep(STEPS.CONFIRMATION)
      }
    } catch (error) {
      setErrorMessage(
        error.message
          ? error.message.toLowerCase()
          : 'error: access list is probably full :(',
      )
      playSound('button_cancel.wav')
      setStep(STEPS.ERROR)
    }
  }

  const handleMint = async () => {
    /*
    await contracts.LvlV1.mint({
      value: donationAmount.toString(),
    })
    */
    setStep(STEPS.CONFIRMATION)
  }

  const increaseDonation = () => {
    setDonationAmount(donationAmount.add(ethers.utils.parseEther('0.01')))
  }

  const decreaseDonation = () => {
    if (donationAmount <= 0) return
    setDonationAmount(donationAmount.sub(ethers.utils.parseEther('0.01')))
  }

  const handleTwitterShare = () => {
    const content = encodeURI(
      `Join my journey on @lvlprotocol https://lvlprotocol.xyz/token/${address}`,
    )
    window.location = `https://twitter.com/intent/tweet?text=${content}`
  }

  let controls = {}
  switch (step) {
    case STEPS.READY:
    case STEPS.ERROR:
      controls = {
        a: handleSave,
        b: previousStep,
      }
      break
    case STEPS.PREMINT:
      controls = {
        up: increaseDonation,
        down: decreaseDonation,
        a: handleMint,
        b: previousStep,
      }
      break
    case STEPS.CONFIRMATION:
      controls = {
        a: handleTwitterShare,
      }
      break
    case STEPS.SAVE:
    case STEPS.MINT:
    default:
  }

  return (
    <ConfiguratorContainer>
      <ConfiguratorScreen>
        {step === STEPS.READY ? (
          <ConfiguratorPrompt
            message="ready?"
            actionA="sign"
            actionB="go back"
          />
        ) : undefined}

        {step === STEPS.SAVE ? (
          <ConfiguratorPrompt message="saving..." />
        ) : undefined}

        {step === STEPS.PREMINT ? (
          <ConfiguratorPrompt message="Minting coming soon..." actionA="mint" />
        ) : undefined}

        {step === STEPS.MINT ? (
          <ConfiguratorPrompt message="minting..." />
        ) : undefined}

        {step === STEPS.CONFIRMATION ? (
          <ConfiguratorPrompt
            message="well done, your journey will begin soon..."
            actionA="bring a friend"
          />
        ) : undefined}

        {step === STEPS.ERROR ? (
          <ConfiguratorPrompt
            message={errorMessage}
            actionA="try again?"
            actionB="go back"
          />
        ) : undefined}
      </ConfiguratorScreen>
      <ConfiguratorControlsView {...controls} />
    </ConfiguratorContainer>
  )
}

export default SaveConfiguratorView

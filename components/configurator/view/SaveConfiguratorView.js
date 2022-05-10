import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

import useConfigurator from '../../hooks/useConfigurator'
import useWeb3 from '../../hooks/useWeb3'
import ConfiguratorControlsView from './ConfiguratorControlsView'
import ConfiguratorContainer from '../ui/ConfiguratorContainer'
import ConfiguratorScreen from '../ui/ConfiguratorScreen'
import ConfiguratorPrompt from '../ui/ConfiguratorPrompt'
import TokenView from '../../token/view/TokenView'
import NFTArrowTokenViewContainer from '../ui/NFTArrowTokenViewContainer'
import { playSound } from '../../../util/audio'
import ConfiguratorModal from '../ui/ConfiguratorModal'

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
  const { flow, nftAddress, nftId, previousStep, save, setStatusIndicator } =
    useConfigurator()
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

  let prompt
  switch (step) {
    case STEPS.READY:
      prompt = (
        <ConfiguratorPrompt message="ready?" actionA="sign" actionB="go back" />
      )
      break
    case STEPS.SAVE:
      prompt = <ConfiguratorPrompt message="saving..." />
      break
    case STEPS.PREMINT:
      prompt = (
        <ConfiguratorPrompt message="Minting coming soon..." actionA="mint" />
      )
      break
    case STEPS.MINT:
      prompt = <ConfiguratorPrompt message="minting..." />
      break
    case STEPS.CONFIRMATION:
      prompt = (
        <ConfiguratorPrompt
          message="well done, your journey will begin soon..."
          actionA="bring a friend"
        />
      )
      break
    case STEPS.ERROR:
      prompt = (
        <ConfiguratorPrompt
          message={errorMessage}
          actionA="try again?"
          actionB="go back"
        />
      )
      break
    default:
    // leave prompt undefined
  }

  return (
    <ConfiguratorContainer>
      <ConfiguratorScreen withNav>
        <NFTArrowTokenViewContainer>
          <TokenView address={address} nftId={nftId} nftAddress={nftAddress} />
        </NFTArrowTokenViewContainer>
        <ConfiguratorModal>{prompt}</ConfiguratorModal>
      </ConfiguratorScreen>
      <ConfiguratorControlsView {...controls} />
    </ConfiguratorContainer>
  )
}

export default SaveConfiguratorView

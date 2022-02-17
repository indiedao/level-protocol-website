import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import useConfigurator from '../../hooks/useConfigurator'
import useWeb3 from '../../hooks/useWeb3'
import Button from '../../ui/Button'
import ConfiguratorControlsView from './ConfiguratorControlsView'
import { Body1 } from '../../ui/Typography'
import ConfiguratorContainer from '../ui/ConfiguratorContainer'
import ConfiguratorNavView from './ConfiguratorNavView'
import ConfiguratorScreen from '../ui/ConfiguratorScreen'
import ConfiguratorPrompt from '../ui/ConfiguratorPrompt'

const STATE_STATUS_MAP = {
  CONFIG: 'saving...',
  MINT: 'minting...',
  CONFIRMATION: 'connected',
}

const SaveConfiguratorView = () => {
  const [state, setState] = useState('CONFIG')
  const [donationAmount, setDonationAmount] = useState(
    ethers.utils.parseEther('0.01'),
  )
  const { flow, previousStep, save, setStatusIndicator } = useConfigurator()
  const { contracts, address } = useWeb3()

  // Set status indicator message:
  useEffect(() => {
    setStatusIndicator({
      message: STATE_STATUS_MAP[state],
    })
  }, [setStatusIndicator, state])

  const handleSave = async () => {
    try {
      await save()
      if (flow === 'MINT') {
        // Prompt user to mint:
        setState('MINT')
      } else {
        // Show confirmation:
        setState('CONFIRMATION')
      }
    } catch (e) {
      // Show error:
      setState('ERROR')
    }
  }

  const handleMint = async () => {
    await contracts.LvlV1.mint({
      value: donationAmount.toString(),
    })
    setState('CONFIRMATION')
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
      `Join my journey on @lvlprotocol https://lvlprotocol.xyz/tokens/${address}`,
    )
    window.location = `https://twitter.com/intent/tweet?text=${content}`
  }

  const handleTwitterView = () => {
    window.location = 'https://twitter.com/lvlprotocol'
  }

  if (state === 'ERROR')
    return (
      <ConfiguratorContainer>
        <ConfiguratorScreen>
          <ConfiguratorNavView />
          <ConfiguratorPrompt
            message="error: access list is probably full :("
            action="keep watch"
          />
        </ConfiguratorScreen>
        <ConfiguratorControlsView a={handleTwitterView} />
      </ConfiguratorContainer>
    )

  if (state === 'CONFIRMATION')
    return (
      <ConfiguratorContainer>
        <ConfiguratorScreen>
          <ConfiguratorNavView />
          <ConfiguratorPrompt
            message="well done, your journey will begin soon..."
            action="bring a friend"
          />
        </ConfiguratorScreen>
        <ConfiguratorControlsView a={handleTwitterShare} />
      </ConfiguratorContainer>
    )

  if (state === 'CONFIG')
    return (
      <ConfiguratorContainer>
        <ConfiguratorScreen>
          <ConfiguratorNavView />
          <ConfiguratorPrompt message="ready?" action="sign" />
        </ConfiguratorScreen>
        <ConfiguratorControlsView a={handleSave} b={previousStep} />
      </ConfiguratorContainer>
    )

  return (
    <ConfiguratorContainer>
      <ConfiguratorScreen>
        <ConfiguratorNavView />
        <div>
          <Body1>
            Donate to the Buidlers:{' '}
            {ethers.utils.formatEther(donationAmount.toString())} ETH (optional)
          </Body1>
          <Button onClick={handleMint}>mint</Button>
        </div>
      </ConfiguratorScreen>
      <ConfiguratorControlsView
        up={increaseDonation}
        down={decreaseDonation}
        a={handleMint}
        b={previousStep}
      />
    </ConfiguratorContainer>
  )
}

export default SaveConfiguratorView

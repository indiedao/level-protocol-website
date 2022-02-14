import { useState } from 'react'
import { ethers } from 'ethers'
import useConfigurator from '../../hooks/useConfigurator'
import useWeb3 from '../../hooks/useWeb3'
import Button from '../../ui/Button'
import ConfiguratorControlsView from './ConfiguratorControlsView'
import { Body1 } from '../../ui/Typography'
import ConfiguratorContainer from '../ui/ConfiguratorContainer'
import ConfiguratorNavView from './ConfiguratorNavView'
import ConfiguratorScreen from '../ui/ConfiguratorScreen'

const SaveConfiguratorView = () => {
  const [state, setState] = useState('CONFIG')
  const [donationAmount, setDonationAmount] = useState(
    ethers.utils.parseEther('0.01'),
  )
  const { flow, previousStep, save } = useConfigurator()
  const { contracts } = useWeb3()

  const handleSave = async () => {
    await save()

    if (flow === 'MINT') {
      // Prompt user to mint:
      setState('MINT')
    } else {
      // Show confirmation:
      setState('CONFIRMATION')
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

  if (state === 'CONFIRMATION') return <Body1>Success!</Body1>

  if (state === 'CONFIG')
    return (
      <ConfiguratorContainer>
        <ConfiguratorScreen>
          <ConfiguratorNavView />
          <div>
            <Button onClick={handleSave}>save</Button>
          </div>
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

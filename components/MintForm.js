import { useState } from 'react'
import Button from './ui/Button'
import useWeb3 from './hooks/useWeb3'
import { Body1 } from './ui/Typography'
import NFTList from './NFTList'

const MintForm = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [configSaved, setConfigSaved] = useState(false)
  const [nftAddress, setNftAddress] = useState()
  const [nftId, setNftId] = useState()
  const { address, contracts, networkError, eth, ens } = useWeb3()

  if (!address || networkError) {
    return <Body1>Please connect to your wallet.</Body1>
  }

  if (error) {
    if (error.match('Address can only have one LVL token!')) {
      return <Body1>You already have a LVL token!</Body1>
    }
    return <Body1>Unknown Error!</Body1>
  }

  const saveConfig = async () => {
    const message = `Saving NFT ${nftId} as profile image`
    const signature = await eth.personal.sign(message, address)

    await fetch('/api/save-config', {
      method: 'POST',
      body: JSON.stringify({
        address,
        nftAddress,
        nftId,
        signature,
        message,
      }),
    })

    setConfigSaved(true)
  }

  const mint = async () => {
    try {
      setLoading(true)
      await contracts.LvlV1.mint()
      setLoading(false)
    } catch (e) {
      setError(e.message)
    }
  }

  // TODO (nicovalencia): abstract these to state provider as page gets more complex:

  // Loading state:
  if (loading) return <Body1>Transaction pending...</Body1>

  // Minting state:
  if (configSaved) {
    return (
      <div>
        <Body1>NFT Address: {nftAddress}</Body1>
        <Body1>NFT Id: {nftId}</Body1>
        <Button onClick={() => setConfigSaved(false)}>edit</Button>
        <Button onClick={mint}>mint</Button>
      </div>
    )
  }

  // Config state:
  return (
    <div>
      <Body1>
        ENS:{' '}
        {ens === false
          ? 'Go register one at ens.domains'
          : ens || 'Loading ENS...'}
      </Body1>
      <NFTList
        handleSelect={({ address: contractAddress, id }) => {
          setNftAddress(contractAddress)
          setNftId(id)
        }}
      />
      <Button onClick={saveConfig}>save</Button>
    </div>
  )
}

export default MintForm

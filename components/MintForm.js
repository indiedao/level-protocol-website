import { useState } from 'react'
import Button from './ui/Button'
import useWeb3 from './hooks/useWeb3'
import useConfigurator from './hooks/useConfigurator'
import { Body1 } from './ui/Typography'

const MintForm = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const { address, contracts, networkError, ens } = useWeb3()
  const { nftId, nftAddress } = useConfigurator()

  if (!address || networkError) {
    return <Body1>Please connect to your wallet.</Body1>
  }

  if (error) {
    if (error.match('Address can only have one LVL token!')) {
      return <Body1>You already have a LVL token!</Body1>
    }
    return <Body1>Unknown Error!</Body1>
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

  if (loading) return <Body1>Transaction pending...</Body1>

  return (
    <div>
      <Body1>
        ENS:{' '}
        {ens === false
          ? 'Go register one at ens.domains'
          : ens || 'Loading ENS...'}
      </Body1>
      <Body1>NFT Address: {nftAddress}</Body1>
      <Body1>NFT Id: {nftId}</Body1>
      <Button onClick={mint}>mint</Button>
    </div>
  )
}

export default MintForm

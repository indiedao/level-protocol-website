import { useState } from 'react'
import { Button } from './ui/Buttons'
import useWeb3 from './hooks/useWeb3'
import { Body1 } from './ui/Typography'

const MintButton = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const { accounts, contracts } = useWeb3()

  if (!accounts.length) {
    return <Body1>Please connect to your wallet.</Body1>
  }

  if (error) {
    return <Body1>{error}</Body1>
  }

  const mint = async () => {
    try {
      setLoading(true)
      await contracts.LvlV1Contract.methods.mint().send({
        from: accounts[0],
      })
      setLoading(false)
    } catch (e) {
      setError(e.message)
    }
  }

  if (loading) return <Body1>Transaction pending...</Body1>

  return <Button onClick={mint}>mint</Button>
}

export default MintButton

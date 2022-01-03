import { Button } from './ui/Buttons'
import useWeb3 from './hooks/useWeb3'
import { Body1 } from './ui/Typography'

const ConnectButton = () => {
  const { connect, accounts, error } = useWeb3()

  if (error) {
    return <Body1>{error}</Body1>
  }

  if (accounts.length) {
    return <Body1>{accounts[0]}</Body1>
  }

  return <Button onClick={connect}>connect</Button>
}

export default ConnectButton

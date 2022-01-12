import { Button } from './ui/Buttons'
import useWeb3 from './hooks/useWeb3'
import { Body1 } from './ui/Typography'
import { NetworkId } from '../util/constants'

const ConnectButton = () => {
  const { connect, accounts, error, provider, networkId } = useWeb3()

  if (error) {
    if (networkId !== NetworkId) {
      return (
        <Button
          onClick={async () => {
            await provider.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: NetworkId }],
            })
          }}
        >
          {error}
        </Button>
      )
    }

    return <Body1>{error}</Body1>
  }

  if (accounts.length) {
    return <Body1>{accounts[0]}</Body1>
  }

  return <Button onClick={connect}>connect</Button>
}

export default ConnectButton

import Button from './ui/Button'
import useWeb3 from './hooks/useWeb3'
import { Body1 } from './ui/Typography'
import { Network } from '../util/constants'

const ConnectButton = () => {
  const { connect, address, networkError, web3 } = useWeb3()

  if (networkError) {
    return (
      <Button
        onClick={async () => {
          await web3.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: Network.hexId }],
          })
        }}
      >
        {networkError}
      </Button>
    )
  }

  if (address) {
    return <Body1>{address}</Body1>
  }

  return <Button onClick={connect}>connect</Button>
}

export default ConnectButton

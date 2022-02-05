import Button from './ui/Button'
import useWeb3 from './hooks/useWeb3'
import { Body1 } from './ui/Typography'
import { Network } from '../util/constants'

const ConnectButton = () => {
  const { connect, address, networkError, web3 } = useWeb3()

  const switchChain = () => {
    try {
      web3.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: Network.hexId }],
      })
    } catch (e) {
      console.log(e)
    }
  }

  if (networkError) {
    switchChain()
    return <Button onClick={switchChain}>{networkError}</Button>
  }

  if (address) {
    return <Body1>{address}</Body1>
  }

  return <Button onClick={connect}>connect</Button>
}

export default ConnectButton

import { useMemo, useCallback, useEffect, createContext, useState } from 'react'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'

import LvlV1ABI from '../../abi/contracts/LvlV1.sol/LvlV1.json'
import { InfuraId, LvlV1Address, Network } from '../../util/constants'

const Web3Context = createContext()

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: InfuraId,
    },
  },
}

export const Web3Provider = ({ children }) => {
  const [web3Modal, setWeb3Modal] = useState()
  const [signer, setSigner] = useState()
  const [address, setAddress] = useState()
  const [contracts, setContracts] = useState({})
  const [web3, setWeb3] = useState()
  const [provider, setProvider] = useState()
  const [networkId, setNetworkId] = useState()
  const [networkError, setNetworkError] = useState()

  useEffect(() => {
    setWeb3Modal(
      new Web3Modal({
        cacheProvider: false,
        providerOptions,
      }),
    )
  }, [])

  useEffect(() => {
    if (networkId && networkId !== Network.id) {
      setNetworkError(
        `Please switch to ${ethers.providers.getNetwork(Network.id).name}`,
      )
    } else {
      setNetworkError(false)
    }
  }, [networkId])

  const connect = useCallback(
    async function connect() {
      const _web3 = await web3Modal.connect()
      const _provider = new ethers.providers.Web3Provider(_web3, 'any')
      const _signer = _provider.getSigner()
      const _address = await _signer.getAddress()
      const _network = await _provider.getNetwork()

      setProvider(_provider)
      setWeb3(_web3)
      setSigner(_signer)
      setNetworkId(_network.chainId)
      setAddress(_address)

      // Initialize contracts:
      setContracts({
        ...contracts,
        LvlV1Contract: new ethers.Contract(LvlV1Address, LvlV1ABI, _signer),
      })

      // Watch for address changes:
      _provider.on('network', newNetwork => {
        setNetworkId(newNetwork.chainId)
      })
    },
    [contracts, web3Modal],
  )

  const disconnect = useCallback(
    async function disconnect() {
      await web3Modal.clearCachedProvider()
      // TODO: clear account/provider
    },
    [web3Modal],
  )

  const memoizedData = useMemo(() => {
    return {
      connect,
      disconnect,
      signer,
      address,
      networkId,
      contracts,
      web3,
      networkError,
      provider,
    }
  }, [
    signer,
    address,
    contracts,
    networkError,
    provider,
    networkId,
    web3,
    connect,
    disconnect,
  ])

  return (
    <Web3Context.Provider value={memoizedData}>{children}</Web3Context.Provider>
  )
}

export default Web3Context

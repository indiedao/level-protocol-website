import { useMemo, useCallback, useEffect, createContext, useState } from 'react'
import WalletConnectProvider from '@walletconnect/web3-provider'
import Web3 from 'web3'
import Web3Modal from 'web3modal'

import LvlV1ABI from '../../abi/contracts/LvlV1.sol/LvlV1.json'
import {
  InfuraId,
  LvlV1Address,
  NetworkId,
  NetworkName,
} from '../../util/constants'

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
  const [accounts, setAccounts] = useState([])
  const [contracts, setContracts] = useState({})
  const [web3, setWeb3] = useState()
  const [provider, setProvider] = useState()
  const [networkId, setNetworkId] = useState()
  const [error, setError] = useState()

  useEffect(() => {
    setWeb3Modal(
      new Web3Modal({
        cacheProvider: false,
        providerOptions,
      }),
    )
  }, [])

  useEffect(() => {
    if (networkId && networkId !== NetworkId) {
      setError(`Please switch to ${NetworkName}`)
    }
  }, [networkId])

  const connect = useCallback(
    async function connect() {
      const providerInstance = await web3Modal.connect()
      const web3Instance = new Web3(providerInstance)

      // Set provider:
      setProvider(providerInstance)
      setWeb3(web3Instance)

      // Set accounts:
      setAccounts(await web3Instance.eth.getAccounts())

      // Set network:
      setNetworkId(web3Instance.currentProvider.chainId)

      // Initialize contracts:
      const LvlV1Contract = new web3Instance.eth.Contract(
        LvlV1ABI,
        LvlV1Address,
      )
      setContracts({
        ...contracts,
        LvlV1Contract,
      })

      // Watch for address changes:
      providerInstance.on('accountsChanged', newAccounts => {
        setAccounts(newAccounts)
        setError(null)
      })

      // Watch for network changes:
      providerInstance.on('chainChanged', newNetworkId => {
        setNetworkId(newNetworkId)
        setError(null)
      })
    },
    [contracts, web3Modal],
  )

  const disconnect = useCallback(
    async function disconnect() {
      await web3Modal.clearCachedProvider()

      if (provider?.disconnect && typeof provider.disconnect === 'function') {
        await provider.disconnect()
      }

      setProvider(null)
      setAccounts([])
    },
    [web3Modal, provider, setAccounts, setProvider],
  )

  const memoizedData = useMemo(() => {
    return {
      connect,
      disconnect,
      accounts,
      networkId,
      contracts,
      web3,
      error,
      provider,
    }
  }, [
    accounts,
    contracts,
    error,
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

import { useMemo, useCallback, useEffect, createContext, useState } from 'react'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import Web3 from 'web3'

import LvlV1ABI from '../../abi/contracts/LvlV1.sol/LvlV1.json'
import { LvlV1Address, Network, HTTPRPC } from '../../util/constants'

const Web3Context = createContext()

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {
        [Network.id]: HTTPRPC,
      },
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
  const [hasLvlToken, setHasLvlToken] = useState(false)
  const [eth, setEth] = useState()
  const [ens, setEns] = useState()

  useEffect(() => {
    setWeb3Modal(
      new Web3Modal({
        cacheProvider: true,
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

  // Reload token data whenever deps change:
  useEffect(() => {
    let active = true

    const refreshToken = async () => {
      if (!contracts.LvlV1 || !address) return
      try {
        const balance = Number(await contracts.LvlV1.balanceOf(address))
        if (active) setHasLvlToken(balance > 0)
      } catch (e) {
        if (active) setHasLvlToken(0)
      }
    }

    const refreshEns = async () => {
      if (!address || !provider) return
      const _ens = await provider.lookupAddress(address)
      if (active) setEns(_ens || false)
    }

    refreshToken()
    refreshEns()

    // Kill any async requests if deps change to avoid race conditions:
    return () => {
      active = false
    }
  }, [networkId, contracts.LvlV1, address, provider])

  const connect = useCallback(
    async function connect() {
      const _web3 = await web3Modal.connect()
      const _provider = new ethers.providers.Web3Provider(_web3, 'any')
      const _signer = _provider.getSigner()
      const _address = await _signer.getAddress()
      const _network = await _provider.getNetwork()
      const { eth: _eth } = new Web3(_web3)

      setProvider(_provider)
      setWeb3(_web3)
      setSigner(_signer)
      setNetworkId(_network.chainId)
      setAddress(_address)
      setEth(_eth)

      // Initialize contracts:
      setContracts({
        ...contracts,
        LvlV1: new ethers.Contract(LvlV1Address, LvlV1ABI, _signer),
      })

      // Watch for provider network changes:
      _provider.on('network', newNetwork => {
        setNetworkId(newNetwork.chainId)
      })

      // Watch for wallet account change:
      _web3.on('accountsChanged', async () => {
        setSigner(_provider.getSigner())
        setAddress(await _provider.getSigner().getAddress())
      })
    },
    [contracts, web3Modal],
  )

  const disconnect = useCallback(async () => {
    await web3Modal.clearCachedProvider()
    setProvider(null)
    setWeb3(null)
    setSigner(null)
    setNetworkId(null)
    setAddress(null)
    setContracts({})
  }, [web3Modal])

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
      hasLvlToken,
      eth,
      ens,
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
    hasLvlToken,
    eth,
    ens,
  ])

  return (
    <Web3Context.Provider value={memoizedData}>{children}</Web3Context.Provider>
  )
}

export default Web3Context

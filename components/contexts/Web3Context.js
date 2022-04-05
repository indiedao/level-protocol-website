import jwt from 'jsonwebtoken'
import { useMemo, useCallback, useEffect, createContext, useState } from 'react'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'

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
  const [ens, setEns] = useState()
  const [bearerToken, setBearerToken] = useState()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

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

  // Save JWT wallet sig (bearerToken) locally:
  useEffect(() => {
    if (bearerToken) localStorage.setItem('bearerToken', bearerToken)
  }, [bearerToken])

  // Read JWT wallet sig (bearerToken) on bootstrap:
  useEffect(() => {
    const _bearerToken = localStorage.getItem('bearerToken')
    if (_bearerToken) setBearerToken(_bearerToken)
  }, [])

  // Reload token data whenever deps change:
  useEffect(() => {
    let active = true

    const refreshToken = async () => {
      if (!contracts.LvlV1 || !address) return
      try {
        const balance = Number(await contracts.LvlV1.balanceOf(address))
        if (active) setHasLvlToken(balance > 0)
      } catch (e) {
        if (active) setHasLvlToken(false)
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

  const resetBearerToken = () => {
    setBearerToken(null)
    setIsLoggedIn(false)
    localStorage.removeItem('bearerToken')
  }

  const promptSignature = async ({ _signer, _address }) => {
    const sig = await _signer.signMessage(
      `I am signing into lvl protocol as ${_address}`,
    )
    const _bearerToken = jwt.sign(
      { sig, address: _address },
      'lvlprotocol', // public key
    )
    setBearerToken(_bearerToken)
  }

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

      // Prompt user to sign login message (unless already cached):
      if (!bearerToken) {
        await promptSignature({ _signer, _address })
      }

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
        resetBearerToken()
        await promptSignature({ _signer, _address })
        setSigner(_provider.getSigner())
        setAddress(await _provider.getSigner().getAddress())
        setIsLoggedIn(true)
      })

      setIsLoggedIn(true)
    },
    [bearerToken, contracts, web3Modal],
  )

  const disconnect = useCallback(async () => {
    await web3Modal.clearCachedProvider()
    setProvider(null)
    setWeb3(null)
    setSigner(null)
    setNetworkId(null)
    setAddress(null)
    setContracts({})
    resetBearerToken()
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
      ens,
      bearerToken,
      isLoggedIn,
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
    ens,
    bearerToken,
    isLoggedIn,
  ])

  return (
    <Web3Context.Provider value={memoizedData}>{children}</Web3Context.Provider>
  )
}

export default Web3Context

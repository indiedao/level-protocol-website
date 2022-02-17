import { useEffect, useCallback, useState } from 'react'
import { AlchemyProvider } from '@ethersproject/providers'
import { HTTPRPC, Network } from '../../util/constants'

const useEns = address => {
  const [ens, setEns] = useState()

  const fetchEns = useCallback(async () => {
    const provider = new AlchemyProvider(Network.name, HTTPRPC)
    const _ens = await provider.lookupAddress(address)
    setEns(_ens)
  }, [address])

  useEffect(() => {
    fetchEns()
  }, [fetchEns, address])

  return { ens }
}

export default useEns

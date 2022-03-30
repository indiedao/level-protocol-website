import { useEffect, useCallback, useState } from 'react'
import { AlchemyProvider } from '@ethersproject/providers'
import { AlchemyApiKey, Network } from '../../util/constants'

const useEns = address => {
  const [ens, setEns] = useState()

  const fetchEns = useCallback(async () => {
    try {
      const provider = new AlchemyProvider(Network.name, AlchemyApiKey)
      const _ens = await provider.lookupAddress(address)
      setEns(_ens)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }
  }, [address])

  useEffect(() => {
    fetchEns()
  }, [fetchEns, address])

  return { ens }
}

export default useEns

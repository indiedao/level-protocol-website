import { useEffect, useCallback, useState } from 'react'
import useWeb3 from './useWeb3'

const useEns = address => {
  const [ens, setEns] = useState()
  const { provider } = useWeb3()

  const fetchEns = useCallback(async () => {
    const _ens = await provider.lookupAddress(address)
    setEns(_ens)
  }, [address, provider])

  useEffect(() => {
    fetchEns()
  }, [fetchEns, address])

  return { ens }
}

export default useEns

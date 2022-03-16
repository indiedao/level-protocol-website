import { useEffect, useState, useCallback } from 'react'
import useWeb3 from './useWeb3'

const useMember = () => {
  const [member, setMember] = useState()
  const { address } = useWeb3()

  const loadMember = useCallback(async () => {
    const resp = await fetch('/api/get-member', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        address,
      }),
    })

    const json = await resp.json()
    setMember(json.data.member)
  }, [address])

  useEffect(() => {
    if (address) loadMember()
  }, [address, loadMember])

  return { member, loadMember }
}

export default useMember

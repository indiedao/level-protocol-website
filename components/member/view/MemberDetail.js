import { useState, useEffect, useCallback } from 'react'
import useWeb3 from '../../hooks/useWeb3'

const MemberDetail = () => {
  const [member, setMember] = useState()
  const { address } = useWeb3()

  useEffect(() => {
    const loadMember = async () => {
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
    }

    if (address) loadMember()
  }, [address])

  if (!member) return <h2>Loading member...</h2>

  return (
    <div>
      <h2>Member Details</h2>
      <ul>
        <li>Address: {address}</li>
        <li>nftId: {member.nftId}</li>
        <li>nftAddress: {member.nftAddress}</li>
        <li>colorHue: {member.colorHue}</li>
        <li>colorLightness: {member.colorLightness}</li>
        <li>github: {member.github || 'NO GITHUB LINKED'}</li>
      </ul>
    </div>
  )
}

export default MemberDetail

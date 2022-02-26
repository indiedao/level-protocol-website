import { useState, useEffect } from 'react'
import useWeb3 from '../../hooks/useWeb3'

const CommunityDetail = () => {
  const [community, setCommunity] = useState()
  const { bearerToken } = useWeb3()

  useEffect(() => {
    const fetchCommunityDetail = async () => {
      const resp = await fetch('/api/get-community', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${bearerToken}`,
        },
      })
      const json = await resp.json()
      setCommunity(json.data.community)
    }

    if (bearerToken) fetchCommunityDetail()
  }, [bearerToken])

  if (!community) return <h2>Loading community...</h2>

  return (
    <div>
      <h2>Community Details</h2>
      <ul>
        <li>Name: {community.name}</li>
        <li>Address: {community.address}</li>
        <li>Members Hash: {community.membersHash}</li>
      </ul>
    </div>
  )
}

export default CommunityDetail

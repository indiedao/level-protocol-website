import { useState, useEffect } from 'react'
import useWeb3 from '../../hooks/useWeb3'

const CommunityDetail = () => {
  const [community, setCommunity] = useState()
  const [membersMap, setMembersMap] = useState({})
  const { bearerToken } = useWeb3()

  const fetchMembersHashData = async membersHash => {
    const resp = await fetch(
      `https://indiedao.mypinata.cloud/ipfs/${membersHash}`,
    )
    const json = await resp.json()
    setMembersMap(json)
  }

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
      fetchMembersHashData(json.data.community.membersHash)
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
      <h2>Members</h2>
      <ul>
        {Object.keys(membersMap).map(address => (
          <li key={address}>
            <a
              href={`https://indiedao.mypinata.cloud/ipfs/${membersMap[address]}`}
              target="_blank"
              rel="noreferrer"
            >
              {address}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CommunityDetail

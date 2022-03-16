import { useState, useEffect } from 'react'
import useWeb3 from './useWeb3'

const useCommunity = () => {
  const [community, setCommunity] = useState()
  const [members, setMembers] = useState({})
  const { bearerToken } = useWeb3()

  const fetchMembersHashData = async membersHash => {
    const resp = await fetch(
      `https://indiedao.mypinata.cloud/ipfs/${membersHash}`,
    )
    const json = await resp.json()
    setMembers(json)
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
      const _community = json.data.community
      setCommunity(_community)
      if (_community) fetchMembersHashData(json.data.community.membersHash)
    }

    if (bearerToken) fetchCommunityDetail()
  }, [bearerToken])

  return { community, members }
}

export default useCommunity

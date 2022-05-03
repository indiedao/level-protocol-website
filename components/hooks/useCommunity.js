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
    const fetchCommunityDetail = async () =>
      fetch('/api/get-community', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${bearerToken}`,
        },
      })
        .then(response => response.json())
        .then(json => {
          const _community = json.data?.community || null
          setCommunity(_community)
          if (_community) fetchMembersHashData(json.data.community.membersHash)
        })
        .catch(error => {
          console.log(error) // eslint-disable-line no-console
          setCommunity(undefined)
        })

    if (bearerToken) fetchCommunityDetail()
  }, [bearerToken])

  return { community, members }
}

export default useCommunity

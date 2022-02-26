import { useEffect } from 'react'
import useWeb3 from '../../hooks/useWeb3'

const CommunityDetail = () => {
  const { bearerToken } = useWeb3()

  useEffect(() => {
    const fetchCommunityDetail = async () => {
      const data = await fetch('/api/get-community', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${bearerToken}`,
        },
      })

      console.log('data', data)
    }

    if (bearerToken) fetchCommunityDetail()
  }, [bearerToken])

  return (
    <div>
      <h2>Community Details</h2>
    </div>
  )
}

export default CommunityDetail

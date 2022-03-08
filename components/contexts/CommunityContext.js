import { useMemo, useEffect, createContext, useState } from 'react'
import useWeb3 from '../hooks/useWeb3'

const CommunityContext = createContext()

export const CommunityProvider = ({ children }) => {
  const [currentCommunity, setCurrentCommunity] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const { address } = useWeb3()

  useEffect(() => {
    const verifyAdmin = async () => {
      if (address) {
        const res = await fetch(`/api/admin/${address}`)
        const { community } = await res.json()

        if (community && !currentCommunity) {
          setCurrentCommunity(community)
          setIsAdmin(true)
        }
      }
    }

    verifyAdmin()
  }, [address, currentCommunity])

  const communityData = useMemo(
    () => ({
      currentCommunity,
      isAdmin,
    }),
    [currentCommunity, isAdmin],
  )

  return (
    <CommunityContext.Provider value={communityData}>
      {children}
    </CommunityContext.Provider>
  )
}

export default CommunityContext

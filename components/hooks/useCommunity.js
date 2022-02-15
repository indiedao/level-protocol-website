import { useContext } from 'react'

import CommunityContext from '../contexts/CommunityContext'

const useCommunity = () => {
  const context = useContext(CommunityContext)
  return context
}

export default useCommunity

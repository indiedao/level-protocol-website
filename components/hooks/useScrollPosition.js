import { useContext } from 'react'

import ScrollContext from '../contexts/ScrollContext'

const useScrollPosition = () => {
  const { position } = useContext(ScrollContext)
  return position
}

export default useScrollPosition

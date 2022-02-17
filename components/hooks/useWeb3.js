import { useContext } from 'react'

import Web3Context from '../contexts/Web3Context'

const useWeb3 = () => {
  const context = useContext(Web3Context)
  return context
}

export default useWeb3

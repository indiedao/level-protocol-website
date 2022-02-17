import { useContext } from 'react'

import ConfiguratorContext from '../contexts/ConfiguratorContext'

const useConfigurator = () => {
  const context = useContext(ConfiguratorContext)
  return context
}

export default useConfigurator

import { useState } from 'react'
import useWeb3 from './useWeb3'

const useIntegrationConfig = () => {
  const [loading, setLoading] = useState(false)
  const { bearerToken } = useWeb3()

  const saveSnapshot = async ({ ens }) => {
    setLoading(true)
    await fetch('/api/save-integration-config', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${bearerToken}`,
      },
      body: JSON.stringify({
        integration: 'snapshot',
        config: {
          ens,
        },
      }),
    })
    setLoading(false)
  }

  return { saveSnapshot, loading }
}

export default useIntegrationConfig

import { useState, useEffect } from 'react'
import useWeb3 from '../../hooks/useWeb3'
import Button from '../../ui/Button'
import SnapshotTrigger from './SnapshotTrigger'

const SnapshotIntegrationForm = () => {
  const [loading, setLoading] = useState(false)
  const [ens, setEns] = useState('')
  const { bearerToken } = useWeb3()

  const save = async () => {
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

  useEffect(() => {
    const fetchConfig = async () => {
      const resp = await fetch('/api/get-community', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${bearerToken}`,
        },
      })
      const json = await resp.json()
      setEns(json.data.community.snapshotEns)
    }

    if (bearerToken) fetchConfig()
  }, [bearerToken])

  return (
    <div>
      <input
        type="text"
        placeholder="ens"
        onChange={e => setEns(e.target.value)}
        value={ens}
      />
      <Button type="button" onClick={save}>
        {loading ? 'Saving...' : 'save'}
      </Button>
      <SnapshotTrigger />
    </div>
  )
}

export default SnapshotIntegrationForm

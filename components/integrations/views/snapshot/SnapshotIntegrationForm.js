import { useState } from 'react'
import useCommunity from '../../../hooks/useCommunity'
import useIntegrationConfig from '../../../hooks/useIntegrationConfig'
import Button from '../../../ui/Button'
import SnapshotTrigger from './SnapshotTrigger'

const SnapshotIntegrationForm = () => {
  const { community } = useCommunity()
  const [ens, setEns] = useState(community?.snapshotEns || '')
  const { saveSnapshot, loading } = useIntegrationConfig()

  if (!community) return <h2>Loading community...</h2>

  return (
    <div>
      <input
        type="text"
        placeholder="ens"
        onChange={e => setEns(e.target.value)}
        value={ens}
      />
      <Button type="button" onClick={() => saveSnapshot({ ens })}>
        {loading ? 'Saving...' : 'save'}
      </Button>
      <SnapshotTrigger />
    </div>
  )
}

export default SnapshotIntegrationForm

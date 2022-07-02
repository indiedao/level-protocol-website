import { useState } from 'react'
import Button from '../../../ui/Button'
import useWeb3 from '../../../hooks/useWeb3'

const PoapTrigger = () => {
  const [loading, setLoading] = useState(false)
  const { bearerToken } = useWeb3()

  const trigger = async () => {
    setLoading(true)
    await fetch('/api/triggers/poap', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${bearerToken}`,
      },
    })
    setLoading(false)
  }

  return (
    <Button onClick={trigger}>{loading ? 'Loading...' : 'POAP Trigger'}</Button>
  )
}

export default PoapTrigger

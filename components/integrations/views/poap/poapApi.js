import { useState } from 'react'
import useWeb3 from '../../../hooks/useWeb3'

export const useCreatePoapEvents = () => {
  const [isCreatingPoapEvents, setIsCreatingPoapEvents] = useState(false)
  const { bearerToken } = useWeb3()

  const createPoapEvents = async (communityId, eventIds) => {
    setIsCreatingPoapEvents(true)

    await fetch('/api/create-poap-events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${bearerToken}`,
      },
      body: JSON.stringify({
        communityId,
        eventIds,
      }),
    })

    setIsCreatingPoapEvents(false)
  }

  return { isCreatingPoapEvents, createPoapEvents }
}

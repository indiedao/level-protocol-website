import { useCallback, useEffect, useState } from 'react'
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

export const usePoapEvents = () => {
  const [poapEvents, setPoapEvents] = useState([])
  const { bearerToken } = useWeb3()

  const getPoapEvents = useCallback(async () => {
    try {
      const resp = await fetch('/api/get-poap-events', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${bearerToken}`,
        },
      })
      const json = await resp.json()
      setPoapEvents(json.events)
    } catch (err) {
      console.error(err) // eslint-disable-line no-console
    }
  }, [setPoapEvents, bearerToken])

  useEffect(() => {
    getPoapEvents()
  }, [getPoapEvents])

  return { poapEvents, getPoapEvents }
}

export const useDeletePoapEvent = () => {
  const { bearerToken } = useWeb3()

  const deletePoapEvent = async id => {
    try {
      await fetch('/api/delete-poap-event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${bearerToken}`,
        },
        body: JSON.stringify({ id }),
      })
    } catch (err) {
      console.error(err) // eslint-disable-line no-console
    }
  }

  return { deletePoapEvent }
}

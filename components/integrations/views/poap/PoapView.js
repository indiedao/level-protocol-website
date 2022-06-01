import { useState } from 'react'
import styled from 'styled-components'
import { H4, H2, Body1 } from '../../../ui/Typography'
import Button from '../../../ui/Button'
import useCommunity from '../../../hooks/useCommunity'
import useWeb3 from '../../../hooks/useWeb3'
import PoapTrigger from './PoapTrigger'
import PoapEventInput from './PoapEventInput'
import {
  useCreatePoapEvents,
  usePoapEvents,
  useDeletePoapEvent,
} from './poapApi'
import PoapEventList from './PoapEventList'

const IntegrationsHeader = styled.div`
  margin-bottom: 3.6rem;
`

const PoapView = () => {
  // const { isAdmin, currentCommunity } = useCommunity()
  const { community } = useCommunity()
  const isAdmin = true // TODO: Temp
  const { disconnect } = useWeb3()
  const { createPoapEvents } = useCreatePoapEvents()
  const { poapEvents, getPoapEvents } = usePoapEvents()
  const { deletePoapEvent } = useDeletePoapEvent()

  const handleSubmitEventIds = async eventIds => {
    await createPoapEvents(community._id, eventIds)
    getPoapEvents()
  }

  const handleDelete = async id => {
    await deletePoapEvent(id)
    getPoapEvents()
  }

  const integrationsOptions = isAdmin ? (
    <>
      <IntegrationsHeader>
        <H2>{community?.name} POAP Integration</H2>
        <Button onClick={disconnect}>Disconnect</Button>
        <PoapTrigger />
        <PoapEventInput onSubmit={handleSubmitEventIds} />
        <PoapEventList events={poapEvents} onDelete={handleDelete} />
      </IntegrationsHeader>
    </>
  ) : (
    <>
      <Body1 color="white">You do not have enough permissions.</Body1>
      <Button onClick={disconnect}>Disconnect</Button>
    </>
  )

  return integrationsOptions
}

export default PoapView

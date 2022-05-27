import { useEffect, useState } from 'react'
import Head from 'next/head'

import useWeb3 from '../components/hooks/useWeb3'
import useCommunity from '../components/hooks/useCommunity'
import CreateCommunityForm from '../components/community/view/CreateCommunityForm'
import CommunityDetail from '../components/community/view/CommunityDetail'
import SnapshotIntegrationForm from '../components/integrations/views/snapshot/SnapshotIntegrationForm'
import CoordinapeIntegrationForm from '../components/integrations/views/coordinape/IntegrationForm'
import PoapTrigger from '../components/integrations/views/poap/PoapTrigger'

const STEPS = {
  CONNECT: 'CONNECT',
  LOAD: 'LOAD',
  CREATE: 'CREATE',
  INTEGRATE: 'INTEGRATE',
  ERROR: 'ERROR',
}

const CommunityDashboardPage = () => {
  const [step, setStep] = useState(STEPS.CONNECT)
  const { address, networkError, connect } = useWeb3()
  const { community } = useCommunity()

  useEffect(() => {
    // show an error whenever it occurs
    if (networkError && step !== STEPS.ERROR) {
      setStep(STEPS.ERROR)
    }
  }, [networkError, step])

  useEffect(() => {
    // if connected, try to load community
    if (address && step === STEPS.CONNECT) {
      setStep(STEPS.LOAD)
    }
  }, [address, step])

  useEffect(() => {
    // if community has loaded, either create or integrate
    if (step === STEPS.LOAD) {
      setStep(community === null ? STEPS.CREATE : STEPS.INTEGRATE)
    }
  }, [community, step])

  useEffect(() => {
    // if community has been created, try to integrate
    if (step === STEPS.CREATE) {
      setStep(community === null ? STEPS.CREATE : STEPS.INTEGRATE)
    }
  }, [community, step])

  return (
    <div>
      <Head>
        <title>lvl protocol</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>hello {address || ''}</h1>
        {step === STEPS.CONNECT ? (
          <button type="button" onClick={connect}>
            connect wallet
          </button>
        ) : undefined}
        {step === STEPS.LOAD ? <h2>Loading cbommunity...</h2> : undefined}
        {step === STEPS.CREATE ? <CreateCommunityForm /> : undefined}
        {step === STEPS.INTEGRATE ? (
          <>
            <CommunityDetail />
            <SnapshotIntegrationForm />
            <CoordinapeIntegrationForm />
            <PoapTrigger />
          </>
        ) : undefined}
        {step === STEPS.ERROR ? <h2>Error: {networkError}</h2> : undefined}
      </main>
    </div>
  )
}

export default CommunityDashboardPage

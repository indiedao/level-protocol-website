import Head from 'next/head'
import useWeb3 from '../components/hooks/useWeb3'

import CreateCommunityForm from '../components/community/view/CreateCommunityForm'
import CommunityDetail from '../components/community/view/CommunityDetail'
import SnapshotIntegrationForm from '../components/integrations/view/SnapshotIntegrationForm'

const CommunityDashboardPage = () => {
  const { address, networkError, connect } = useWeb3()

  if (!address || networkError)
    return (
      <button type="button" onClick={connect}>
        connect wallet
      </button>
    )

  return (
    <div>
      <Head>
        <title>lvl protocol</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>hi {address}</h1>
        <p>Community Dashboard will live here...</p>
        <CreateCommunityForm />
        <CommunityDetail />
        <SnapshotIntegrationForm />
      </main>
    </div>
  )
}

export default CommunityDashboardPage

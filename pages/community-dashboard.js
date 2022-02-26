import Head from 'next/head'
import useWeb3 from '../components/hooks/useWeb3'

import CreateCommunityForm from '../components/community/view/CreateCommunityForm'
import CommunityDetail from '../components/community/view/CommunityDetail'
import SnapshotTrigger from '../components/triggers/view/SnapshotTrigger'

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
        <SnapshotTrigger />
      </main>
    </div>
  )
}

export default CommunityDashboardPage

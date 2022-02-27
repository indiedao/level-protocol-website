import Head from 'next/head'
import useWeb3 from '../components/hooks/useWeb3'

import MemberDetail from '../components/member/view/MemberDetail'

const MemberDashboardPage = () => {
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
        <p>Member Dashboard will live here...</p>
        <MemberDetail />
      </main>
    </div>
  )
}

export default MemberDashboardPage

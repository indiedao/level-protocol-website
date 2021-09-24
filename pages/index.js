import Head from 'next/head'

import { H1 } from '../components/ui/Typography';

const Home = () => {
  return (
    <div>
      <Head>
        <title>Level Protocol</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <H1>Welcome to Level Protocol</H1>
      </main>
    </div>
  )
}

export default Home

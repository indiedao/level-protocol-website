/* eslint-disable @next/next/no-html-link-for-pages */
import Head from 'next/head'

const Page401 = () => (
  <div>
    <Head>
      <title>Level Protocol | Not Found</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main>
      <h1>401 Unauthorized</h1>
      <a href="/login">Login</a>
    </main>
  </div>
)

export default Page401

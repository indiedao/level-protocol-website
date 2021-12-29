import Head from 'next/head'
import Image from 'next/image'

import { H1 } from '../components/ui/Typography'
import Public from '../components/layouts/Public'

const Page = () => {
  return (
    <div>
      <Head>
        <title>Level Protocol</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Public>
          <H1 color="base900">
            <Image alt="logo" height={60} width={595} src="/images/logo.svg" />
          </H1>
        </Public>
      </main>
    </div>
  )
}

export default Page

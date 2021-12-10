import styled from 'styled-components'
import Head from 'next/head'
import Image from 'next/image'

import { H1, A } from '../components/ui/Typography'
import Web3Layout from '../components/layouts/Web3Layout'

const Home = () => {
  return (
    <div>
      <Head>
        <title>Level Protocol</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Web3Layout>
          <Layout>
            <H1>
              <Image
                alt="logo"
                height={60}
                width={595}
                src="/images/logo.svg"
              />
            </H1>
            <LinkLayout>
              <A
                href="https://docs.google.com/document/d/1mv4vfrYRBwc8nI7jGBoqDITV-desH_UhFNA3UW8dUnw/edit#"
                target="_blank"
              >
                Read White Paper (v1.1)
              </A>
            </LinkLayout>
          </Layout>
        </Web3Layout>
      </main>
    </div>
  )
}

const Layout = styled.div`
  margin: 0 auto;
  max-width: 900px;
  display: grid;
  grid-row-gap: 40px;
  justify-content: center;
  padding-top: 180px;
`

const LinkLayout = styled.div`
  display: flex;
  justify-content: center;
`
export default Home

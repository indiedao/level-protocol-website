import styled from 'styled-components'
import Head from 'next/head'

import { H1, A } from '../components/ui/Typography'

const Home = () => {
  return (
    <div>
      <Head>
        <title>Level Protocol</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Layout>
          <H1>
            <img height={60} src="/images/logo.svg" />
          </H1>
          <LinkLayout>
            <A
              href="https://docs.google.com/document/d/1hK_w_HT--Vau45nTBR2EdPuiOaSYaWw6wLXEi1rFJqo/edit#"
              target="_blank"
            >
              Read White Paper
            </A>
          </LinkLayout>
        </Layout>
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

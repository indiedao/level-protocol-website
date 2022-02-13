import styled from 'styled-components'
import Head from 'next/head'
import Pyramid from '../../components/Pyramid'

const Level = () => {
  return (
    <div>
      <Head>
        <title>Level Protocol</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Layout>
          <Pyramid />
        </Layout>
      </main>
    </div>
  )
}

const Layout = styled.div`
  width: 100vw;
  height: 100vh;
`

export default Level

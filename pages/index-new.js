import styled from 'styled-components'
import Head from 'next/head'
import Link from 'next/link'

import Public from '../components/layouts/Public'
import MenuBar from '../components/ui/MenuBar'
import LevelWindow from '../components/ui/LevelWindow'
import Hero from '../components/ui/Hero/Hero'

const Content = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: 1fr;
  padding-top: 14.8rem;
  width: 100%;
`

const LongContent = styled.div`
  height: 150vh;
`

const Page = () => {
  return (
    <div>
      <Head>
        <title>Level Protocol</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Public>
          <MenuBar>
            <Link href="/about">About</Link>
            <Link href="/join">Join</Link>
          </MenuBar>
          <Content>
            <LevelWindow
              enableActions={false}
              maxHeight="75vh"
              title="Level Protocol"
            >
              <>
                <Hero />
                <LongContent />
              </>
            </LevelWindow>
          </Content>
        </Public>
      </main>
    </div>
  )
}

export default Page

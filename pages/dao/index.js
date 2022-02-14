import styled from 'styled-components'
import Head from 'next/head'

import { H2 } from '../../components/ui/Typography'
import MenuBar from '../../components/ui/MenuBar'
import Link from '../../components/ui/Link'
import Button from '../../components/ui/Button'
import LevelWindow from '../../components/ui/LevelWindow'
import Public from '../../components/layouts/Public'
import useWeb3 from '../../components/hooks/useWeb3'

const PageContent = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: 1fr;
  padding-top: 14.8rem;
  width: 100%;
`

const Article = styled.article`
  padding: 6.4rem;
`

const DashboardWrapper = styled.div`
  h2 {
    color: white;
    margin: 0.5rem 0;
  }
  button {
    margin-bottom: 4rem;
  }
`

const Dashboard = () => {
  const { address, connect, disconnect } = useWeb3()

  return (
    <div>
      <Head>
        <title>Level Protocol - Rollup</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Public>
          <MenuBar>
            <Link href="/about">About</Link>
            <Link href="/join">Join</Link>
          </MenuBar>
          <PageContent>
            <LevelWindow
              backgroundColor="vibrantBlack"
              enableActions={false}
              maxHeight="75vh"
              title="Dashboard"
            >
              <Article>
                <DashboardWrapper>
                  {address ? (
                    <>
                      <H2>Options</H2>
                      <ul>
                        <li>Members Management - - Coming Soon</li>
                        <li>
                          <Link href="/dao/integrations">Data Rollup</Link>
                        </li>
                        <li>
                          <Link onClick={disconnect}>Disconnect</Link>
                        </li>
                      </ul>
                    </>
                  ) : (
                    <Button onClick={connect}>Connect</Button>
                  )}
                </DashboardWrapper>
              </Article>
            </LevelWindow>
          </PageContent>
        </Public>
      </main>
    </div>
  )
}

export default Dashboard

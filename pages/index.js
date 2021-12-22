import styled, { css } from 'styled-components'
import Head from 'next/head'
import Image from 'next/image'

import { H1 } from '../components/ui/Typography'
import Web3Layout from '../components/layouts/Web3Layout'

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

const AStyles = css`
  position: relative;
  font-family: 'Matter';
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 2rem;
  text-decoration-line: none;
  margin: 0 6px;
  padding-bottom: 3px;
  border-bottom: 1px solid white;
  cursor: pointer;

  /* Truncate long links inside of overflow hidden parents: */
  text-overflow: ellipsis;
  display: inline-block;
  vertical-align: middle;
  overflow: hidden;
  color: ${props => props.theme.colors[props.color || 'black']};
`

const A = styled.a`
  ${AStyles}
  ::before {
    content: '';
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 0%;
    background-color: ${props =>
      props.theme.colors[props.backgroundColor || 'white']};
    transition: all 500ms;
    cursor: pointer;
    z-index: -1;
  }

  &:hover {
    ::before {
      content: '';
      height: 100%;
    }
  }
`

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
            <H1 color="base900">
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
                color="base900"
                backgroundColor="base700"
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

export default Home

import styled from 'styled-components'

import { H1 } from '../components/ui/Typography'
import Web3Layout from '../components/layouts/Web3Layout'
import ConnectButton from '../components/ConnectButton'
import MintButton from '../components/MintButton'

const MintPage = () => {
  return (
    <Web3Layout>
      <Layout>
        <ConnectButton />
        <H1 color="base900">Mint LVL Token</H1>
        <MintButton />
      </Layout>
    </Web3Layout>
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

export default MintPage

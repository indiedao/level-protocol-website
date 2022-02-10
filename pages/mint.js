import styled from 'styled-components'

import { H1, Body1 } from '../components/ui/Typography'
import ConnectButton from '../components/ConnectButton'
import MintButton from '../components/MintButton'
import useWeb3 from '../components/hooks/useWeb3'

const MintPage = () => {
  const { hasLvlToken } = useWeb3()

  return (
    <Layout>
      <ConnectButton />
      <H1 color="base900">Mint LVL Token</H1>
      {!hasLvlToken && <MintButton />}
      {hasLvlToken && <Body1>You already have a lvl token!</Body1>}
    </Layout>
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

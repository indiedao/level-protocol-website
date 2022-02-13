import styled from 'styled-components'
import { H1 } from '../components/ui/Typography'
import ConnectButton from '../components/ConnectButton'
import ConfiguratorView from '../components/configurator/view/ConfiguratorView'
import { ConfiguratorProvider } from '../components/contexts/ConfiguratorContext'

const MintPage = () => (
  <Layout>
    <ConnectButton />
    <H1 color="base900">Mint/Configure LVL Token</H1>
    <ConfiguratorProvider>
      <ConfiguratorView />
    </ConfiguratorProvider>
  </Layout>
)

const Layout = styled.div`
  margin: 0 auto;
  max-width: 900px;
  display: grid;
  grid-row-gap: 40px;
  justify-content: center;
  padding-top: 180px;
`

export default MintPage

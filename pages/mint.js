import styled from 'styled-components'
import ConnectButton from '../components/ConnectButton'
import ConfiguratorView from '../components/configurator/view/ConfiguratorView'
import { ConfiguratorProvider } from '../components/contexts/ConfiguratorContext'
import useWeb3 from '../components/hooks/useWeb3'

const MintPage = () => {
  const { address } = useWeb3()

  if (!address) return <ConnectButton />

  return (
    <Layout>
      <ConfiguratorProvider>
        <ConfiguratorView />
      </ConfiguratorProvider>
    </Layout>
  )
}

const Layout = styled.div`
  margin: 0 auto;
  display: grid;
  justify-content: center;
`

export default MintPage

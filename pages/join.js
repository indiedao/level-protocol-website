import styled from 'styled-components'
import ConfiguratorView from '../components/configurator/view/ConfiguratorView'
import { ConfiguratorProvider } from '../components/contexts/ConfiguratorContext'

const JoinPage = () => {
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

export default JoinPage

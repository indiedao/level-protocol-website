import styled from 'styled-components'

import ConfiguratorView from '../components/configurator/view/ConfiguratorView'
import { ConfiguratorProvider } from '../components/contexts/ConfiguratorContext'

const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  max-height: 100vh;
  max-width: 100vw;
  overflow: hidden;
`

const JoinPage = () => {
  return (
    <Layout>
      <ConfiguratorProvider>
        <ConfiguratorView />
      </ConfiguratorProvider>
    </Layout>
  )
}

export default JoinPage

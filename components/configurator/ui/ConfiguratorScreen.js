import styled from 'styled-components'
import useConfigurator from '../../hooks/useConfigurator'
import StatusIndicator from './StatusIndicator'

const ConfiguratorScreen = ({ children }) => {
  const { statusMessage } = useConfigurator()

  return (
    <Frame>
      <Screen>{children}</Screen>
      <StatusIndicator message={statusMessage} />
    </Frame>
  )
}

const Frame = styled.div`
  justify-self: start;
  background-color: ${props => props.theme.colors.mutedGray};
  padding: 46px 17px 17px;
  box-shadow: inset 0px 0px 32px rgba(0, 0, 0, 0.75),
    inset 0px -16px 24px rgba(255, 255, 255, 0.25),
    inset 0px 8px 16px rgba(255, 255, 255, 0.25);
  border-radius: 8px;
  width: 100%;
  max-width: calc(100vw - 6.4rem);
`

const Screen = styled.div`
  display: grid;
  grid-template-rows: min-content auto;
  grid-gap: 2.4rem;
  background-color: ${props => props.theme.colors.vibrantScreen};
  padding: 20px 20px;
  box-shadow: inset 0px 0px 16px #000000;
  height: 100%;
`

export default ConfiguratorScreen

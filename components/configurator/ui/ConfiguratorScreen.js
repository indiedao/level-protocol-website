import styled from 'styled-components'

import useConfigurator from '../../hooks/useConfigurator'
import ConfiguratorNavView from '../view/ConfiguratorNavView'
import StatusIndicator from './StatusIndicator'

const Frame = styled.div`
  justify-self: start;
  background-color: ${props => props.theme.colors.mutedGray};
  padding: 4.6rem 1.7rem 1.7rem;
  box-shadow: inset 0 0 3.2rem rgba(0, 0, 0, 0.75),
    inset 0 -1.6rem 2.4rem rgba(255, 255, 255, 0.25),
    inset 0 0.8rem 1.6rem rgba(255, 255, 255, 0.25);
  border-radius: 0.8rem;
  width: 100%;
  max-width: calc(100vw - 6.4rem);
`

const Screen = styled.div`
  display: grid;
  grid-template-rows: ${({ withNav }) =>
    withNav ? 'min-content auto' : 'auto'};
  grid-gap: 2.4rem;
  background-color: ${props => props.theme.colors.vibrantScreen};
  padding: 2rem 2rem;
  box-shadow: inset 0 0 1.6rem #000000;
  height: 100%;
`

const ConfiguratorScreen = ({ children, withNav }) => {
  const { statusMessage } = useConfigurator()

  return (
    <Frame>
      <Screen withNav={withNav}>
        {withNav ? <ConfiguratorNavView /> : undefined}
        {children}
      </Screen>
      <StatusIndicator message={statusMessage} />
    </Frame>
  )
}

export default ConfiguratorScreen

import styled from 'styled-components'
import PropTypes from 'prop-types'

import useConfigurator from '../../hooks/useConfigurator'
import StatusIndicator from './StatusIndicator'

const Frame = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  max-width: calc(100vw - 3.2rem);
  overflow: hidden;
  background-color: ${props => props.theme.colors.mutedGray};
  padding: clamp(3rem, 10vw, 4.8rem) clamp(1rem, 4vw, 1.8rem)
    clamp(1rem, 4vw, 1.8rem);
  box-shadow: inset 0 0 3.2rem rgba(0, 0, 0, 0.75),
    inset 0 -1.6rem 2.4rem rgba(255, 255, 255, 0.25),
    inset 0 0.8rem 1.6rem rgba(255, 255, 255, 0.25);
  border-radius: min(1.333vw, 0.8rem);

  @media (min-width: 320px) {
    max-width: calc(100vw - 6.4rem);
  }
`

const LCD = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr;
  padding: clamp(0.4rem, 4vw, 2rem);
  overflow: hidden;
  background-color: ${props => props.theme.colors.vibrantScreen};
  box-shadow: inset 0 0 1.6rem #000000;
`

const Screen = ({ children }) => {
  const { statusMessage } = useConfigurator()

  return (
    <Frame>
      <LCD>{children}</LCD>
      <StatusIndicator message={statusMessage} />
    </Frame>
  )
}

Screen.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Screen

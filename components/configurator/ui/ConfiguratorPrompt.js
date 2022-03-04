import styled, { keyframes } from 'styled-components'
import PropTypes from 'prop-types'

import { H2, H4 } from '../../ui/AltTypography'
import TypeItOut from '../../ui/TypeItOut'

const Wrapper = styled.div`
  align-self: center;
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-columns: 1fr;
  grid-gap: 2.4rem;
  text-align: center;
`

const ButtonIndicators = styled.div`
  display: grid;
  justify-items: end;
  align-items: center;
  grid-template-columns: auto min-content;
  grid-gap: 1rem;
`

const glow = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`

const ButtonIndicator = styled.div`
  background-color: ${({ theme, variant }) =>
    variant === 'A' ? theme.colors.mutedGreen : theme.colors.mutedRed};
  width: 5rem;
  height: 5rem;
  border-radius: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
  animation: ${glow} 1.5s infinite forwards;

  > * {
    transform: translate(0.2rem, 0.1rem);
  }
`

const ConfiguratorPrompt = ({ message, actionA, actionB }) => (
  <Wrapper>
    <H2 color="vibrantPixel">
      <TypeItOut message={message} />
    </H2>
    {actionA || actionB ? (
      <ButtonIndicators>
        {actionA ? (
          <>
            <H4 color="vibrantPixel">{actionA}</H4>
            <ButtonIndicator variant="A">
              <H2>A</H2>
            </ButtonIndicator>
          </>
        ) : undefined}
        {actionB ? (
          <>
            <H4 color="vibrantPixel">{actionB}</H4>
            <ButtonIndicator variant="B">
              <H2>B</H2>
            </ButtonIndicator>
          </>
        ) : undefined}
      </ButtonIndicators>
    ) : undefined}
  </Wrapper>
)

ConfiguratorPrompt.propTypes = {
  message: PropTypes.string.isRequired,
  actionA: PropTypes.string,
  actionB: PropTypes.string,
}

ConfiguratorPrompt.defaultProps = {
  actionA: undefined,
  actionB: undefined,
}

export default ConfiguratorPrompt

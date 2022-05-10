import styled, { keyframes } from 'styled-components'
import PropTypes from 'prop-types'

import { H2, H4 } from '../../ui/AltTypography'
import TypeItOut from '../../ui/TypeItOut'
import ConfiguratorWrapper from './ConfiguratorWrapper'

const Message = styled(H2)`
  font-size: min(10vw, 3.2rem);

  @media (min-width: 320px) {
    font-size: min(8vw, 3.2rem);
  }

  @media (min-width: 420px) {
    font-size: min(5.333vw, 3.2rem);
  }
`

const Action = styled(H4)`
  font-size: min(5vw, 1.8rem);

  @media (min-width: 320px) {
    font-size: min(4.5vw, 1.8rem);
  }

  @media (min-width: 420px) {
    font-size: min(4vw, 1.8rem);
  }
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
  width: min(16vw, 5rem);
  height: min(16vw, 5rem);
  border-radius: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
  animation: ${glow} 1.5s infinite forwards;

  > * {
    font-size: min(10vw, 3.2rem);
    transform: translate(min(0.333vw, 0.2rem), min(0.166vw, 0.1rem));
  }
`

const Prompt = ({ message, actionA, actionB }) => (
  <ConfiguratorWrapper>
    <Message color="vibrantPixel">
      <TypeItOut message={message} />
    </Message>
    {actionA || actionB ? (
      <ButtonIndicators>
        {actionA ? (
          <>
            <Action color="vibrantPixel">{actionA}</Action>
            <ButtonIndicator variant="A">
              <H2>A</H2>
            </ButtonIndicator>
          </>
        ) : undefined}
        {actionB ? (
          <>
            <Action color="vibrantPixel">{actionB}</Action>
            <ButtonIndicator variant="B">
              <H2>B</H2>
            </ButtonIndicator>
          </>
        ) : undefined}
      </ButtonIndicators>
    ) : undefined}
  </ConfiguratorWrapper>
)

Prompt.propTypes = {
  message: PropTypes.string.isRequired,
  actionA: PropTypes.string,
  actionB: PropTypes.string,
}

Prompt.defaultProps = {
  actionA: undefined,
  actionB: undefined,
}

export default Prompt

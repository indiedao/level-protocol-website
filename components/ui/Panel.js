import PropTypes from 'prop-types'
import styled from 'styled-components'

import { H3, Body2 } from './Typography'
import smallIllustrations, {
  SMALL_ILLUSTRATION_NAMES,
} from './illustrations/small'

const Container = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 2.4rem;
  padding: 4.8rem 6.4rem 7.6rem;
  color: white;
  background: linear-gradient(
    137.95deg,
    rgba(255, 255, 255, 0.05) 14.79%,
    rgba(255, 255, 255, 0) 54.22%,
    rgba(255, 255, 255, 0.05) 88.11%
  );
  border-radius: 0.4rem 2.4rem;
  z-index: 1;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border: 0.4rem solid ${props => props.theme.colors.trueBlack};
    border-radius: inherit;
    z-index: -1;
  }

  &::before {
    background: linear-gradient(
      137.95deg,
      rgba(0, 0, 0, 0.8) 0%,
      rgba(0, 0, 0, 0.8) calc(57% - 2.5rem),
      rgba(0, 0, 0, 0.3) 57%,
      rgba(0, 0, 0, 0.8) calc(57% + 2.5rem),
      rgba(0, 0, 0, 0.8) 100%
    );
    transform: translate(1.2rem, 1.2rem);
    clip-path: polygon(
      calc(100% - 1.4rem) 0,
      100% 0,
      100% 100%,
      0 100%,
      0 calc(100% - 1.4rem),
      calc(100% - 1.4rem) calc(100% - 1.4rem),
      calc(100% - 1.4rem) 0
    );
  }
`

const PanelContent = styled(Body2)`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 0.8rem;
  color: ${props => props.theme.colors.trueWhite};
`

const Panel = ({ button, smallIllustrationName, title, children }) => {
  const Illustration = smallIllustrationName
    ? smallIllustrations[smallIllustrationName]
    : undefined

  return (
    <Container>
      <Illustration />
      <PanelContent>
        {title ? <H3 color="trueWhite">{title}</H3> : undefined}
        {children}
      </PanelContent>
      {button}
    </Container>
  )
}

Panel.propTypes = {
  button: PropTypes.element,
  children: PropTypes.node.isRequired,
  smallIllustrationName: PropTypes.oneOf(SMALL_ILLUSTRATION_NAMES),
  title: PropTypes.string,
}

Panel.defaultProps = {
  button: undefined,
  smallIllustrationName: undefined,
  title: undefined,
}

export default Panel

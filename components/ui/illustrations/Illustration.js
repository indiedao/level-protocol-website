import PropTypes from 'prop-types'
import styled from 'styled-components'

import { screenReaderTextStyles } from '../Typography'

const Figure = styled.figure`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  width: 8.8rem;
  height 8.8rem;
  border-radius: 0.8rem;
  z-index: 1;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: inherit;
    z-index: -1;
  }

  &::before {
    background: transparent ${props => props.theme.halftones.md};
    transform: translate(0.8rem, 0.8rem);
  }

  &::after {
    background-color: ${props => props.theme.colors.vibrantBlue};
    border: 0.4rem solid ${props => props.theme.colors.trueBlack};
  }
`

const Figcaption = styled.figcaption`
  ${screenReaderTextStyles}
`

const Illustration = ({ caption, children }) => (
  <Figure>
    {children}
    <Figcaption>{caption}</Figcaption>
  </Figure>
)

Illustration.propTypes = {
  caption: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

Illustration.defaultProps = {
  // no default
}

export default Illustration

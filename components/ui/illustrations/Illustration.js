import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

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

  &::after {
    border-width: 0.4rem;
    border-style: solid;
  }

  ${({ alternative, theme }) =>
    alternative
      ? css`
          border-radius: 1.6rem;

          &::before {
            background: linear-gradient(
              137.95deg,
              rgba(0, 0, 0, 0.8) 0%,
              rgba(0, 0, 0, 0.8) 51%,
              rgba(0, 0, 0, 0.3) 57%,
              rgba(0, 0, 0, 0.8) 63%,
              rgba(0, 0, 0, 0.8) 100%
            );
            border: 0.4rem solid ${theme.colors.trueBlack};
            border-radius: 1.6rem 1.6rem 2.2rem 1.6rem;
            transform: translate(1.2rem, 1.2rem);
            clip-path: polygon(
              calc(100% - 1.4rem) 0,
              100% 0,
              100% 100%,
              0 100%,
              0 calc(100% - 1.4rem),
              calc(100% - 2.6rem) calc(100% - 1.4rem),
              calc(100% - 1.7rem) calc(100% - 1.7rem),
              calc(100% - 1.4rem) calc(100% - 2.6rem),
              calc(100% - 1.4rem) 0
            );
          }

          &::after {
            border-color: ${theme.colors.vibrantBlue};
          }
        `
      : css`
          border-radius: 0.8rem;

          &::before {
            background: transparent ${props => props.theme.halftones.md};
            transform: translate(0.8rem, 0.8rem);
          }

          &::after {
            border-color: ${theme.colors.trueBlack};
            background-color: ${theme.colors.vibrantBlue};
          }
        `}

`

const Figcaption = styled.figcaption`
  ${screenReaderTextStyles}
`

const Illustration = ({ alternative, caption, children }) => (
  <Figure alternative={alternative}>
    {children}
    <Figcaption>{caption}</Figcaption>
  </Figure>
)

Illustration.propTypes = {
  alternative: PropTypes.bool,
  caption: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

Illustration.defaultProps = {
  alternative: false,
}

export default Illustration

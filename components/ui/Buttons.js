import PropTypes from 'prop-types'
import styled from 'styled-components'

import { buttonStyles } from './Typography'
import theme from '../../util/theme'

const StyledButton = styled.button`
  position: relative;
  justify-self: start;
  align-self: start;
  margin: 0 auto 0 0;
  padding: 0 2rem;
  width: auto;
  min-height: 4.4rem;
  background-color: ${props => props.theme.colors.vibrantRed};
  border: 0.25rem solid ${props => props.theme.colors.trueBlack};
  border-radius: 0;
  box-shadow: 0.6rem 0.6rem 0 ${props => props.theme.colors.trueBlack};
  user-select: none;
  transition: box-shadow 233ms ease;
  box-sizing: content-box;
  cursor: ${props => props.theme.cursors.select};

  &::before,
  &::after {
    filter: invert(0);
    transition: filter 233ms ease;
  }

  &::before {
    content: '';
    position: absolute;
    top: -0.05rem;
    right: -0.05rem;
    bottom: -0.05rem;
    left: -0.05rem;
    background: ${props => props.theme.halftones.sm};
    z-index: 0;
    clip-path: polygon(
      0 0,
      100% 0,
      100% 0.2rem,
      0.2rem 0.2rem,
      0.2rem 100%,
      0 100%,
      0 0
    );
    filter: invert(1);
    mix-blend-mode: overlay;
  }

  &::after {
    content: '';
    position: absolute;
    top: -0.05rem;
    right: -0.05rem;
    bottom: -0.05rem;
    left: -0.05rem;
    background: ${props => props.theme.halftones.sm};
    z-index: 0;
    clip-path: polygon(
      100% 100%,
      0 100%,
      0 calc(100% - 0.4rem),
      calc(100% - 0.4rem) calc(100% - 0.4rem),
      calc(100% - 0.4rem) 0,
      100% 0,
      100% 100%
    );
  }

  > * {
    position: relative;
    z-index: 1;
  }

  &:not([data-state]):hover,
  &[data-state='hover'] {
    cursor: ${props => props.theme.cursors.select};
    box-shadow: 1rem 1rem 0 ${props => props.theme.colors.trueBlack};
  }

  &:active,
  &[data-state='active'] {
    background-color: ${props => props.theme.colors.vibrantBlue};
    cursor: ${props => props.theme.cursors.select};

    &::before {
      filter: invert(0);
      mix-blend-mode: normal;
    }

    &::after {
      filter: invert(1);
    }
  }
`

const ButtonContent = styled.span`
  ${buttonStyles}
  position: relative;
  z-index: 2;
`

const Button = ({ children, color, disabled, onClick, stateOverride }) => (
  <StyledButton
    disabled={disabled}
    onClick={onClick}
    type="button"
    data-state={stateOverride}
  >
    <ButtonContent color={color}>{children}</ButtonContent>
  </StyledButton>
)

Button.propTypes = {
  color: PropTypes.oneOf(Object.keys(theme.colors)),
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  stateOverride: PropTypes.oneOf(['resting', 'hover', 'active']),
}

Button.defaultProps = {
  color: 'trueWhite',
  disabled: false,
  onClick: () => null,
  stateOverride: undefined,
}

export default Button

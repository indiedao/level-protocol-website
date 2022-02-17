import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

import { ScreenReaderText } from '../../ui/Typography'

export const VARIANTS = ['default', 'arrow', 'a', 'b']
export const STATES = [
  'resting',
  'resting-disabled',
  'hover',
  'hover-disabled',
  'active',
  'active-disabled',
]

const SHADOWS = {
  'arrow-resting': `
    0 0 0 0.1rem #909090 inset,
    0 0.8rem 1.6rem 0 #dcbee7,
    0 0.2rem 0.2rem 0.2rem #ffffff inset,
    1.6rem 1.6rem 2.4rem 0 rgba(237, 234, 248, 0.8) inset,
    0 -0.4rem 0 0.4rem #7c7c7d inset,
    -1.2rem -1.2rem 0.8rem 0.2rem rgba(255, 255, 255, 0.25) inset`,
  'arrow-hover': `
    0 0 0 0.1rem #909090 inset,
    0 0.8rem 1.6rem 0 #dcbee7,
    0 0.2rem 0.2rem 0.2rem #ffffff inset,
    1.6rem 1.6rem 2.4rem 0 rgba(237, 234, 248, 0.3) inset,
    0 -0.4rem 0 0.4rem #7c7c7d inset,
    -1.2rem -1.2rem 0.8rem 0.2rem rgba(255, 255, 255, 0.25) inset`,
  'arrow-active': `
    0 0 0 0.1rem #909090 inset,
    0 0.8rem 1.6rem #DCBEE7,
    0 0.2rem 0.2rem 0.2rem #FFFFFF inset,
    0 -0.4rem 0 #7C7C7D inset,
    -1.2rem -1.2rem 0.8rem 0.2rem rgba(255, 255, 255, 0.25) inset`,
  'a-resting': `
    0 0.9rem 1.6rem #A1FFF0,
    0.4rem 0.4rem 0.8rem rgba(0, 0, 0, 0.25),
    0 0.2rem 0.2rem 0.2rem #93FFEE inset,
    1.6rem 1.6rem 2.4rem rgba(8, 80, 68, 0.08) inset,
    0 -0.8rem 0 0.3rem #34AB98 inset,
    -1.6rem -3.2rem 1.6rem 0.8rem rgba(255, 255, 255, 0.35) inset`,
  'a-hover': `
    0 0.9rem 1.6rem #A1FFF0,
    0.4rem 0.4rem 0.8rem rgba(0, 0, 0, 0.25),
    0 0.2rem 0.2rem 0.2rem #93FFEE inset,
    1.6rem 1.6rem 2.4rem rgba(8, 80, 68, 0.16) inset,
    0 -0.8rem 0 0.3rem #34AB98 inset,
    -1.6rem -3.2rem 1.6rem 0.8rem rgba(255, 255, 255, 0.25) inset`,
  'a-active': `
    0 0.9rem 1.6rem #A1FFF0,
    0.4rem 0.4rem 0.8rem rgba(0, 0, 0, 0.25),
    0 0.2rem 0.2rem 0.2rem #93FFEE inset,
    1.6rem 1.6rem 2.4rem rgba(8, 80, 68, 0.15) inset,
    0 -0.2rem 0 0.3rem #34AB98 inset,
    -1.6rem -3.2rem 1.6rem 0.8rem rgba(255, 255, 255, 0.3) inset`,
  'b-resting': `
    0 0.8rem 1.6rem #FDAA90,
    0.4rem 0.4rem 0.8rem rgba(0, 0, 0, 0.25),
    0 0.2rem 0.2rem 0.2rem #FCB6A0 inset,
    1.6rem 1.6rem 2.4rem #E86941 inset,
    0 -0.8rem 0 0.3rem #AF3D19 inset,
    -1.6rem -3.2rem 1.6rem 0.8rem rgba(255, 255, 255, 0.25) inset`,
  'b-hover': `
    0 0.8rem 1.6rem #FDAA90,
    0.4rem 0.4rem 0.8rem rgba(0, 0, 0, 0.25),
    0 0.2rem 0.2rem 0.2rem #FCB6A0 inset,
    1.6rem 1.6rem 2.4rem #D14E25 inset,
    0 -0.8rem 0 0.3rem #AF3D19 inset,
    -1.6rem -3.2rem 1.6rem 0.8rem rgba(255, 255, 255, 0.16) inset`,
  'b-active': `
    0 0.8rem 1.6rem #FDAA90,
    0.4rem 0.4rem 0.8rem rgba(0, 0, 0, 0.25),
    0 0.2rem 0.2rem 0.2rem #FCB6A0 inset,
    2.4rem 2.4rem 2.4rem #E16037 inset,
    0 -0.2rem 0 0.3rem #AF3D19 inset,
    -1.6rem -2.4rem 1.6rem 0.8rem rgba(255, 255, 255, 0.25) inset`,
}

const BACKGROUND_COLORS = {
  'arrow-resting': '#bbbec6',
  'arrow-hover': '#bbbec6',
  'arrow-active': '#afb2bb',
  'a-resting': '#45e4cb',
  'a-hover': '#45e4cb',
  'a-active': '#45e4cb',
  'b-resting': '#ee5525',
  'b-hover': '#ee5525',
  'b-active': '#ee5525',
}

const BORDER_COLORS = {
  arrow: '#909090',
  a: '#057d6a',
  b: '#a11212',
}

const StyledButton = styled.button`
  margin: auto;
  padding: 0;
  border: 0.1rem solid transparent;
  border-radius: 50rem;
  background-color: ${({ variant }) => BACKGROUND_COLORS[`${variant}-resting`]};
  border-color: ${({ variant }) => BORDER_COLORS[variant]};
  box-shadow: ${({ variant }) => SHADOWS[`${variant}-resting`]};
  opacity: 1;
  user-select: none;
  transition: box-shadow 89ms ease;

  ${({ variant }) =>
    variant === 'arrow'
      ? css`
          width: 7.2rem;
          height: 7.2rem;
        `
      : css`
          width: 9.6rem;
          height: 9.6rem;
          border-width: 0.2rem;
        `}

  &:hover:not([disabled]):not([data-state]),
  &[data-state='hover'] {
    background-color: ${({ variant }) => BACKGROUND_COLORS[`${variant}-hover`]};
    box-shadow: ${({ variant }) => SHADOWS[`${variant}-hover`]};
  }

  &:active:not([disabled]):not([data-state]),
  &[data-state='active'] {
    background-color: ${({ variant }) =>
      BACKGROUND_COLORS[`${variant}-active`]};
    box-shadow: ${({ variant }) => SHADOWS[`${variant}-active`]};
  }

  &[disabled]:not([data-state]),
  &[data-state$='-disabled'] {
    opacity: 0.7;
  }
`

const Button = ({ disabled, onClick, text, state, variant }) => (
  <StyledButton
    disabled={disabled}
    onClick={onClick}
    type="button"
    data-state={state}
    variant={variant}
  >
    <ScreenReaderText>{text}</ScreenReaderText>
  </StyledButton>
)

Button.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  state: PropTypes.oneOf(STATES),
  variant: PropTypes.oneOf(VARIANTS),
}

Button.defaultProps = {
  disabled: false,
  onClick: () => null,
  state: undefined,
  variant: 'default',
}

export default Button

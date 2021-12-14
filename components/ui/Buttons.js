import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { hexToRgba } from '../../util/colors'

const BaseTextStyles = css`
  font-family: 'Matter';
  font-weight: 600;
  font-size: 1.8rem;
  line-height: 2.4rem;
`

export const TextButton = styled.div`
  ${BaseTextStyles}
  color: ${props => props.theme.colors.base900};
  cursor: pointer;
  padding: 10px 14px;
  border-radius: 8px;

  transition: all 300ms;

  &:hover {
    background-color: ${props => props.theme.colors.base050};
  }

  &:focus {
    background-color: ${props => props.theme.colors.base100};
  }

  &:active {
    background-color: ${props => props.theme.colors.base100};
  }
`

export const RetroButton = styled.div`
  font-family: 'ChicagoFLFRegular';
  font-weight: normal;
  font-style: normal;
  color: ${props => props.theme.colors.black};
  background-color: ${props => props.theme.colors.vibrantGreen};
  padding: 12px;
  cursor: pointer;
  width: 100%;
  text-align: center;
  font-size: 20px;
  line-height: 20px;
  border: 2px solid ${props => props.theme.black};
  box-shadow: inset -2px -2px 0px
      ${props => hexToRgba(props.theme.colors.black, 0.5)},
    6px 6px 0px ${props => props.theme.colors.vibrantBlack};

  transition: all 100ms;

  &:hover {
    filter: brightness(95%);
    background-color: ${props => props.theme.colors.vibrantGreen};
  }

  &:focus {
    border: 4px solid ${props => props.theme.black};
  }

  &:active {
    box-shadow: inset -2px -2px 0px
        ${props => hexToRgba(props.theme.colors.black, 0.5)},
      2px 2px 0px ${props => props.theme.colors.vibrantBlack};
  }
`

export const Button = styled.div`
  ${BaseTextStyles}
  background-color: white;
  color: ${props => props.theme.colors.base900};
  cursor: pointer;
  padding: 12px 28px;
  width: 100%;
  text-align: center;
  border-radius: 16px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.15);
  border: 4px solid white;

  transition: all 300ms;

  &:hover {
    background-color: ${props => props.theme.colors.base400};
    border-color: ${props => props.theme.colors.base100};
  }
  &:focus {
    background-color: ${props => props.theme.colors.base300};
  }

  &:active {
    background-color: ${props => props.theme.colors.base200};
  }

  ${props =>
    props.isDisabled &&
    css`
      &,
      &:hover,
      &:focus,
      &:active {
        background-color: ${props.theme.colors.neutral100};
      }
      box-shadow: none;
    `}
`
Button.propTypes = { isDisabled: PropTypes.bool }
Button.defaultProps = { isDisabled: false }

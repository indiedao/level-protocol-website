import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const BaseTextStyles = css`
  font-family: Work Sans;
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 2rem;
`

export const TextButton = styled.div`
  ${BaseTextStyles}
  color: ${props => props.theme.colors.primary500};
  cursor: pointer;
  padding: 10px 14px;
  border-radius: 8px;

  transition: all 300ms;

  &:hover {
    background-color: ${props => props.theme.colors.primary050};
  }

  &:focus {
    background-color: ${props => props.theme.colors.primary100};
  }

  &:active {
    background-color: ${props => props.theme.colors.primary100};
  }
`

export const Button = styled.div`
  ${BaseTextStyles}
  background-color: ${props => props.theme.colors.primary500};
  color: white;
  cursor: pointer;
  padding: 10px 14px;
  border-radius: 8px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.15);

  transition: background-color 300ms;

  &:hover {
    background-color: ${props => props.theme.colors.primary400};
  }

  &:focus {
    background-color: ${props => props.theme.colors.primary300};
  }

  &:active {
    background-color: ${props => props.theme.colors.primary200};
  }

  ${props =>
    props.isDisabled &&
    css`
      &,
      &:hover,
      &:focus,
      &:active {
        background-color: ${props => props.theme.colors.neutral100};
      }
      color: ${props => props.theme.colors.neutral300};
      box-shadow: none;
    `}
`
Button.propTypes = { isDisabled: PropTypes.bool }
Button.defaultProps = { isDisabled: false }

export default {}

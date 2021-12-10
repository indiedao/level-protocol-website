import styled from 'styled-components'

import { H6Styles } from './Typography'

export const Input = styled.input`
  ${H6Styles}
  border-radius: 16px;
  background-color: transparent;
  border: 3px solid ${props => props.theme.colors.primary100};
  color: white;
  transition: border-color 500ms;

  &:hover,
  &:focus {
    border-color: ${props => props.theme.colors.primary100};
  }

  ::placeholder {
    color: ${props => props.theme.colors.primary100};
  }
`

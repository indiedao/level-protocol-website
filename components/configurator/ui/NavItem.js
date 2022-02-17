import styled, { css } from 'styled-components'

const NavItem = styled.div`
  ${({ active }) =>
    active &&
    css`
      text-decoration: underline;
    `}
`

export default NavItem

import styled, { css } from 'styled-components'

const NavItem = styled.div`
  ${({ active }) =>
    active &&
    css`
      border: 2px solid red;
    `}
`

export default NavItem

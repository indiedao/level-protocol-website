import PropTypes from 'prop-types'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'

import Link from './Link'
import { buttonStyles, linkStyles } from './Typography'
import { LevelLogoIcon } from './icons'

const Wrapper = styled.div`
  --menu-height: 3.6rem;

  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  background-color: ${props => props.theme.colors.vibrantCream};
  box-shadow: 0 0.2rem 0 ${props => props.theme.colors.black};

  ${({ theme }) => theme.bp.mdPlus(' --menu-height: 4.8rem; ')}
`

const sharedMenuContainerStyles = css`
  display: flex;
  justify-content: center;
  min-height: var(--menu-height);
  max-height: var(--menu-height);
`

const sharedMenuItemStyles = css`
  ${linkStyles}
  padding: 0 1.6rem;
  color: ${props => props.theme.colors.mutedBlack};
  border-right: 0.1rem solid ${props => props.theme.colors.mutedBlack};
  text-decoration: none !important;
  white-space: nowrap;
  text-overflow: ellipsis;
  user-select: none;

  &:hover {
    filter: brightness(95%);
    background-color: ${props => props.theme.colors.vibrantCream};
  }

  &:active {
    filter: contrast(115%);
    background-color: ${props => props.theme.colors.vibrantCream};
  }
`

const Menu = styled.nav`
  ${sharedMenuContainerStyles}
  font-size: 2rem;
  line-height: 2rem;

  a {
    ${sharedMenuItemStyles}
    align-self: stretch;
    display: flex;
    justify-content: center;
    align-items: center;

    > *:nth-child(n + 2) {
      margin-left: 1.24rem;

      ${({ theme }) => theme.bp.sm(' display: none; ')}
    }
  }
`

const Brand = styled.span`
  ${linkStyles}
`

const Tray = styled.ul`
  ${sharedMenuContainerStyles}
  margin: 0;
  padding: 0;
  color: ${props => props.theme.colors.mutedBlack};
  list-style-type: none;

  ${({ theme }) => theme.bp.sm(' display: none; ')}
`

const TrayItem = styled.li`
  ${buttonStyles}
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1.6rem;
  user-select: none;
  cursor: ${props => props.theme.cursors.default};
  border-left: 1px solid ${props => props.theme.colors.mutedBlack};
`

const MenuBar = ({ children }) => {
  const [currentDate, setCurrentDate] = useState(new Date())

  useEffect(() => {
    setInterval(() => {
      setCurrentDate(new Date())
    }, 1000)
  }, [])

  return (
    <Wrapper>
      <Menu>
        <Link
          activeColor="mutedBlack"
          color="mutedBlack"
          hoverColor="mutedBlack"
          href="/"
          passHref
        >
          <LevelLogoIcon />
          <Brand>Level Protocol</Brand>
        </Link>
        {children}
      </Menu>
      <Tray>
        <TrayItem>{format(currentDate, 'h:mm a')}</TrayItem>
        <TrayItem>{format(currentDate, 'E MMM d y')}</TrayItem>
      </Tray>
    </Wrapper>
  )
}

MenuBar.propTypes = {
  children: PropTypes.node.isRequired,
}

export default MenuBar

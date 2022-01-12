import PropTypes from 'prop-types'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'

import Link from './Link'
import { buttonStyles, linkStyles } from './Typography'
import { LevelLogoIcon } from './icons'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  background-color: ${props => props.theme.colors.vibrantCream};
  box-shadow: 0 2px 0 ${props => props.theme.colors.black};
`

const sharedMenuContainerStyles = css`
  display: flex;
  justify-content: center;
  min-height: 4.8rem;
  max-height: 4.8rem;
`

const sharedMenuItemStyles = css`
  ${linkStyles}
  padding: 0 1.6rem;
  color: ${props => props.theme.colors.mutedBlack};
  border-right: 1px solid ${props => props.theme.colors.mutedBlack};
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
  list-style-type: none;
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

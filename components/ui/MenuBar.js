import PropTypes from 'prop-types'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import styled from 'styled-components'

import { LevelLogoIcon } from './icons'

const Wrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  background-color: ${props => props.theme.colors.vibrantCream};
  padding: 0;
  margin: 0;
  box-shadow: 0 2px 0 ${props => props.theme.colors.black};

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    user-select: none;

    li {
      display: flex;
      &:hover {
        filter: brightness(95%);
        background-color: ${props => props.theme.colors.vibrantCream};
      }

      &:active {
        filter: contrast(115%);
        background-color: ${props => props.theme.colors.vibrantCream};
      }
      padding: 0;
      margin: 0;
    }

    li.brand,
    a,
    .tray-item {
      display: flex;
      align-items: center;
      font-family: 'ChicagoFLFRegular';
      font-weight: 400;
      font-style: normal;
      font-size: 20px;
      line-height: 20px;
      text-decoration: none;
      border: none;
      padding: 16px;
      margin: 0;
    }

    li.brand {
      svg:first-child {
        margin-right: 14px;
      }
    }

    .tray-item {
      &:hover,
      &:active {
        filter: none;
      }
    }
  }

  ul:first-child li {
    border-right: 1px solid ${props => props.theme.colors.mutedBlack};
  }

  ul:last-child li {
    border-left: 1px solid ${props => props.theme.colors.mutedBlack};
  }
`

const Toolbar = ({ children }) => {
  const [currentDate, setCurrentDate] = useState(new Date())

  useEffect(() => {
    setInterval(() => {
      setCurrentDate(new Date())
    }, 1000)
  }, [])

  return (
    <Wrapper>
      <ul>
        <li className="brand">
          <Link href="/" passHref>
            <>
              <LevelLogoIcon />
              Level Protocol
            </>
          </Link>
        </li>
        {children}
      </ul>
      <ul>
        <li className="tray-item">{format(currentDate, 'h:mm a')}</li>
        <li className="tray-item">{format(currentDate, 'E MMM d y')}</li>
      </ul>
    </Wrapper>
  )
}

Toolbar.propTypes = {
  children: PropTypes.element.isRequired,
}

export default Toolbar

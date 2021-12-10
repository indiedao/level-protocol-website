import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import styled from 'styled-components'

import { Chevron as ChevronIcon } from './icons'

const Wrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  background-color: ${props => props.theme.colors.cream};
  padding: 0;
  margin: 0;
  border-bottom: 2px solid ${props => props.theme.colors.vibrantBlack};

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;

    li {
      display: flex;
      &:hover {
        filter: brightness(95%);
        background-color: ${props => props.theme.colors.cream};
      }

      &:active {
        filter: contrast(115%);
        background-color: ${props => props.theme.colors.cream};
      }

      padding: 4px 12px;
    }

    a {
      display: flex;
      align-items: center;
      font-family: 'ChicagoFLFRegular';
      font-weight: 400;
      font-style: normal;
      font-size: 16px;
      line-height: 26px;
      text-decoration: none;
      border: none;
    }

    li.brand a {
      svg:first-child {
        margin-right: 12px;
      }

      svg:last-child {
        margin-left: 8px;
      }
    }
  }

  ul:first-child li {
    border-right: 1px solid ${props => props.theme.colors.vibrantBlack};
  }

  ul:last-child li {
    border-left: 1px solid ${props => props.theme.colors.vibrantBlack};
  }
`

const Toolbar = ({ brand, children }) => {
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
              {brand}
              <ChevronIcon />
            </>
          </Link>
        </li>
        {children}
      </ul>
      <ul>
        <li>
          <Link href="/one" passHref>
            {format(currentDate, 'h:mm a')}
          </Link>
        </li>
        <li>
          <Link href="/two" passHref>
            {format(currentDate, 'E MMM d y')}
          </Link>
        </li>
      </ul>
    </Wrapper>
  )
}

export default Toolbar

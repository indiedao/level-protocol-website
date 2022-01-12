import PropTypes from 'prop-types'
import NextLink from 'next/link'
import styled, { css } from 'styled-components'

import { linkStyles } from './Typography'
import theme from '../../util/theme'

const sharedLinkStyles = css`
  ${linkStyles}
  justify-self: left;
  margin: 0 auto 0 0;
  cursor: ${props => props.theme.cursors.select};

  &:not([data-state]):hover:not(:active),
  &[data-state='hover'] {
    color: ${props => props.theme.colors[props.hoverColor]};
    text-decoration: underline;
    cursor: ${props => props.theme.cursors.select};
  }

  &:active,
  &[data-state='active'] {
    color: ${props => props.theme.colors[props.activeColor]};
    text-decoration: underline;
    cursor: ${props => props.theme.cursors.select};
  }

  &[disabled],
  &[data-state] {
    cursor: ${props => props.theme.cursors.default};
  }
`

const StyledLink = styled.a`
  ${sharedLinkStyles}
`

const Link = ({
  activeColor,
  children,
  color,
  hoverColor,
  href,
  stateOverride,
  target,
}) => {
  if (/^\//i.test(href)) {
    return (
      <NextLink href={href} passHref>
        <StyledLink
          activeColor={activeColor}
          color={color}
          hoverColor={hoverColor}
          data-state={stateOverride}
        >
          {children}
        </StyledLink>
      </NextLink>
    )
  }
  return (
    <StyledLink
      activeColor={activeColor}
      color={color}
      hoverColor={hoverColor}
      href={href}
      rel={target === '_blank' ? 'noreferrer' : undefined}
      target={target}
      data-state={stateOverride}
    >
      {children}
    </StyledLink>
  )
}

Link.propTypes = {
  activeColor: PropTypes.oneOf(Object.keys(theme.colors)),
  color: PropTypes.oneOf(Object.keys(theme.colors)),
  hoverColor: PropTypes.oneOf(Object.keys(theme.colors)),
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
  stateOverride: PropTypes.oneOf(['resting', 'hover', 'active']),
  target: PropTypes.oneOf(['_blank', '_self']),
}

Link.defaultProps = {
  activeColor: 'vibrantBlue',
  color: 'vibrantGreen',
  hoverColor: 'trueWhite',
  href: '/',
  stateOverride: undefined,
  target: '_blank',
}

export default Link

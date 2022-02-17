import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import theme from '../../util/theme'

const propTypesColor = { color: PropTypes.oneOf(Object.keys(theme.colors)) }

const sharedHeaderStyles = css`
  ${props => css`
    margin: 0;
    color: ${props.theme.colors[props.color]};
    font-family: ${props.theme.fontStacks.alagard};
  `}
`

export const h1Styles = css`
  ${sharedHeaderStyles}
  font-size: 4.8rem;
  line-height: 5.6rem;
`

export const H1 = styled.h1`
  ${h1Styles};
`
H1.propTypes = { ...propTypesColor }
H1.defaultProps = { color: 'trueBlack' }

export const h2Styles = css`
  ${sharedHeaderStyles}
  font-size: 3.2rem;
  line-height: 4rem;
`

export const H2 = styled.h2`
  ${h2Styles}
`

H2.propTypes = { ...propTypesColor }
H2.defaultProps = { color: 'trueBlack' }

export const h3Styles = css`
  ${sharedHeaderStyles}
  font-size: 2.4rem;
  line-height: 3.2rem;
`

export const H3 = styled.h3`
  ${h3Styles}
`

H3.propTypes = { ...propTypesColor }
H3.defaultProps = { color: 'trueBlack' }

export const h4Styles = css`
  ${sharedHeaderStyles}
  font-size: 1.8rem;
  line-height: 2.4rem;
`

export const H4 = styled.h4`
  ${h4Styles}
`

H4.propTypes = { ...propTypesColor }
H4.defaultProps = { color: 'trueBlack' }

const sharedActionStyles = css`
  color: ${props => props.theme.colors[props.color]};
  font-family: ${props => props.theme.fontStacks.alagard};
  text-decoration: none;
  cursor: inherit;
`

export const buttonStyles = css`
  ${sharedActionStyles}
  font-size: 2rem;
  line-height: 2rem;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
`

export const linkStyles = css`
  ${sharedActionStyles}
  color: ${props => props.theme.colors[props.color]};
  font-size: inherit;
  line-height: inherit;
  display: inline;
`

export const A = styled.a`
  ${linkStyles}
`
A.propTypes = { ...propTypesColor }
A.defaultProps = { color: 'mutedGreen' }

export const screenReaderTextStyles = css`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`

export const ScreenReaderText = styled.span`
  ${screenReaderTextStyles}
`

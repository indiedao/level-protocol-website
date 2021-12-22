import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import theme from '../../util/theme'

const propTypesColor = { color: PropTypes.oneOf(Object.keys(theme.colors)) }

const sharedHeaderStyles = css`
  ${props => css`
    margin: 0;
    color: ${props.theme.colors[props.color]};
    font-family: ${props.theme.fontStacks.chicago};
    font-weight: 400;
  `}
`

export const H1Styles = css`
  ${sharedHeaderStyles}
  font-size: 4.8rem;
  line-height: 5.6rem;
`

export const H1 = styled.h1`
  ${H1Styles};
`
H1.propTypes = { ...propTypesColor }
H1.defaultProps = { color: 'trueBlack' }

export const H2Styles = css`
  ${sharedHeaderStyles}
  font-size: 3.2rem;
  line-height: 4rem;
`

export const H2 = styled.h2`
  ${H2Styles}
`

H2.propTypes = { ...propTypesColor }
H2.defaultProps = { color: 'trueBlack' }

export const H3Styles = css`
  ${sharedHeaderStyles}
  font-size: 2.4rem;
  line-height: 3.2rem;
`

export const H3 = styled.h3`
  ${H3Styles}
`

H3.propTypes = { ...propTypesColor }
H3.defaultProps = { color: 'trueBlack' }

export const H4Styles = css`
  ${props => css`
    margin: 0;
    color: ${props.theme.colors[props.color]};
    font-family: ${props.theme.fontStacks.geneva};
    font-weight: 400;
    font-size: 2.4rem;
    line-height: 3.2rem;
  `}
`

export const H4 = styled.h4`
  ${H4Styles}
`

H4.propTypes = { ...propTypesColor }
H4.defaultProps = { color: 'trueBlack' }

const sharedBodyStyles = css`
  ${props => css`
    margin: 0;
    color: ${props.theme.colors[props.color]};
    font-family: ${props.theme.fontStacks.geneva};
    font-weight: 400;
    line-height: 2.8rem;
  `}
`

export const Body1 = styled.p`
  ${sharedBodyStyles}
  font-size: 2rem;
`

export const Body2 = styled.p`
  ${sharedBodyStyles}
  font-size: 1.8rem;
`

const sharedActionStyles = css`
  ${props => css`
    margin: 0;
    color: ${props.theme.colors[props.color]};
    font-family: ${props.theme.fontStacks.chicago};
    font-weight: 400;
    text-overflow: ellipsis;
    overflow: hidden;
    cursor: pointer;
  `}
`

export const StyledButton = styled.button`
  ${sharedActionStyles}
  font-size: 2rem;
  line-height: 2rem;
  text-align: center;
`

StyledButton.propTypes = { ...propTypesColor }
StyledButton.defaultProps = { color: 'trueWhite' }

export const StyledLink = styled.span`
  ${sharedActionStyles}
  font-size: inherit;
  line-height: inherit;
  display: inline-block;
`

StyledLink.propTypes = { ...propTypesColor }
StyledLink.defaultProps = { color: 'vibrantGreen' }

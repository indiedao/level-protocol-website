import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import theme from '../../util/theme'

const propTypesColor = { color: PropTypes.oneOf(Object.keys(theme.colors)) }

export const H1Styles = css`
  font-family: Work Sans;
  font-weight: 500;
  font-size: 5rem;
  line-height: 5.5rem;
  margin: 0;
  color: ${props => props.theme.colors[props.color]};
`
export const H1 = styled.h1`
  ${H1Styles};
`
H1.propTypes = { ...propTypesColor }
H1.defaultProps = { color: 'neutral800' }

export const H2Styles = css`
  font-family: Work Sans;
  font-weight: 500;
  font-size: 4rem;
  line-height: 4.7rem;
  margin: 0;
  color: ${props => props.theme.colors[props.color || 'neutral800']};
`
export const H2 = styled.h2`
  ${H2Styles}
`

export const H3Styles = css`
  font-family: Work Sans;
  font-weight: 500;
  font-size: 3.2rem;
  line-height: 3.8rem;
  margin: 0;
  color: ${props => props.theme.colors[props.color || 'neutral800']};
`
export const H3 = styled.h3`
  ${H3Styles}
`

export const H4Styles = css`
  font-family: Work Sans;
  font-weight: 500;
  font-size: 2.4rem;
  line-height: 2.8rem;
  margin: 0;
  color: ${props => props.theme.colors[props.color || 'neutral800']};
`
export const H4 = styled.h4`
  ${H4Styles}
`

export const H5Styles = css`
  font-family: Work Sans;
  font-weight: 500;
  font-size: 1.8rem;
  line-height: 2.1rem;
  margin: 0;
  color: ${props => props.theme.colors[props.color || 'neutral800']};
`
export const H5 = styled.h5`
  ${H5Styles}
`

export const H6Styles = css`
  font-family: Work Sans;
  font-weight: 500;
  font-size: 1.3rem;
  line-height: 1.8rem;
  margin: 0;
  color: ${props => props.theme.colors[props.color || 'neutral800']};
`
export const H6 = styled.h6`
  ${H6Styles}
`

export const PStyles = css`
  font-family: Work Sans;
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 2rem;
  margin: 0;
  padding: 0;
  color: ${props => props.theme.colors[props.color || 'neutral800']};
`
export const Body1 = styled.p`
  ${PStyles}
  color: ${props => props.theme.colors[props.color || 'neutral800']};
`

export const Body2 = styled.p`
  ${PStyles}
  font-size: 1.3rem;
  line-height: 1.8rem;
  color: ${props => props.theme.colors[props.color || 'neutral800']};
`

export const Caption = styled.p`
  ${PStyles}
  font-size: 1.1rem;
  line-height: 1.4rem;
`

export const Overline1 = styled.p`
  font-family: Work Sans;
  font-weight: 600;
  font-size: 1.2rem;
  line-height: 1.4rem;
  letter-spacing: 0.07rem;
  text-transform: uppercase;
  margin: 0;
  padding: 0;
  color: ${props => props.theme.colors[props.color || 'neutral800']};
`

export const Overline2 = styled.p`
  font-family: Work Sans;
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.2rem;
  letter-spacing: 0.07rem;
  text-transform: uppercase;
  margin: 0;
  padding: 0;
  color: ${props => props.theme.colors[props.color || 'neutral800']};
`

export const AStyles = css`
  font-family: Work Sans;
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 2rem;
  text-decoration-line: underline;
  margin: 0;
  padding: 0 5px;

  /* Truncate long links inside of overflow hidden parents: */
  text-overflow: ellipsis;
  display: inline-block;
  vertical-align: middle;
  overflow: hidden;
  color: ${props => props.theme.colors[props.color || 'neutral800']};
`
export const Hyperlink = styled.a`
  ${AStyles}
`

export const PCodeStyles = css`
  font-family: 'Ubuntu Mono', monospace;
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 2rem;
  margin: 0;
  padding: 2px 5px;
  border-radius: 4px;
  color: ${props => props.theme.colors[props.color || 'primary600']};
  background-color: ${props => props.theme.colors.neutral050};
  border: 1px solid ${props => props.theme.colors.primary050};
`
export const InlineCode = styled.p`
  ${PCodeStyles}
`

export const PreCodeStyles = css`
  display: block;
  font-family: 'Ubuntu Mono', monospace;
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 2rem;
  margin: 0;
  padding: 10px;
  border-radius: 8px;
  color: ${props => props.theme.colors[props.color || 'neutral800']};
  background-color: ${props => props.theme.colors.neutral050};
  border: 1px solid ${props => props.theme.colors.neutral200};
`
export const Code = styled.p`
  ${PreCodeStyles}
`

export default {}

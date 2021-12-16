import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import theme from '../../util/theme'

const propTypesColor = { color: PropTypes.oneOf(Object.keys(theme.colors)) }

export const H1Styles = css`
  ${props => css`
    font-family: 'Montaga', serif;
    font-size: 12rem;
    line-height: 12rem;
    margin: 0;
    color: ${props.theme.colors[props.color || 'black']};

    ${props.theme.bp.sm`
      font-size: 8rem;
      line-height: 8rem;
    `}
  `}
`
export const H1 = styled.h1`
  ${H1Styles};
`
H1.propTypes = { ...propTypesColor }
H1.defaultProps = { color: 'black' }

export const H2Styles = css`
  font-family: 'Montaga', serif;
  font-size: 8rem;
  line-height: 7rem;
  margin: 0;
  color: ${props => props.theme.colors[props.color || 'black']};
`
export const H2 = styled.h2`
  ${H2Styles}
`

export const H3Styles = css`
  font-family: 'Montaga', serif;
  font-size: 4.8rem;
  line-height: 4.8rem;
  margin: 0;
  color: ${props => props.theme.colors[props.color || 'black']};
`
export const H3 = styled.h3`
  ${H3Styles}
`

export const H4Styles = css`
  font-family: 'Matter';
  font-weight: bold;
  font-size: 3.6rem;
  line-height: 3.6rem;
  margin: 0;
  color: ${props => props.theme.colors[props.color || 'black']};
`
export const H4 = styled.h4`
  ${H4Styles}
`

export const H5Styles = css`
  font-family: 'Matter';
  font-weight: bold;
  font-size: 2.4rem;
  line-height: 2.4rem;
  margin: 0;
  color: ${props => props.theme.colors[props.color || 'black']};
`
export const H5 = styled.h5`
  ${H5Styles}
`

export const H6Styles = css`
  font-family: 'Matter';
  font-weight: 600;
  font-size: 1.8rem;
  line-height: 2.2rem;
  margin: 0;
  color: ${props => props.theme.colors[props.color || 'black']};
  ${props => props.theme.bp.sm`
    font-size: 1.2rem;
    line-height: 1.2rem;
  `}
`
export const H6 = styled.h6`
  ${H6Styles}
`

export const PStyles = css`
  font-family: 'Matter';
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 2rem;
  margin: 0;
  padding: 0;
  color: ${props => props.theme.colors[props.color || 'black']};
`
export const Body1 = styled.p`
  ${PStyles}
  color: ${props => props.theme.colors[props.color || 'black']};
`

export const Body2 = styled.p`
  ${PStyles}
  font-size: 1.3rem;
  line-height: 1.8rem;
  color: ${props => props.theme.colors[props.color || 'black']};
`

export const Caption = styled.p`
  ${PStyles}
  font-size: 1.5rem;
  line-height: 3.2rem;
`

export const Overline1 = styled.p`
  font-family: 'Matter';
  font-weight: 600;
  font-size: 1.2rem;
  line-height: 1.4rem;
  letter-spacing: 0.07rem;
  text-transform: uppercase;
  margin: 0;
  padding: 0;
  color: ${props => props.theme.colors[props.color || 'black']};
`

export const Overline2 = styled.p`
  font-family: 'Matter';
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.2rem;
  letter-spacing: 0.07rem;
  text-transform: uppercase;
  margin: 0;
  padding: 0;
  color: ${props => props.theme.colors[props.color || 'black']};
`

export const AStyles = css`
  position: relative;
  font-family: 'Matter';
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 2rem;
  text-decoration-line: none;
  margin: 0 6px;
  padding-bottom: 3px;
  border-bottom: 1px solid white;
  cursor: pointer;

  /* Truncate long links inside of overflow hidden parents: */
  text-overflow: ellipsis;
  display: inline-block;
  vertical-align: middle;
  overflow: hidden;
  color: ${props => props.theme.colors[props.color || 'black']};
`

export const A = styled.a`
  ${AStyles}
  ::before {
    content: '';
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 0%;
    background-color: ${props =>
      props.theme.colors[props.backgroundColor || 'white']};
    transition: all 500ms;
    cursor: pointer;
    z-index: -1;
  }

  &:hover {
    ::before {
      content: '';
      height: 100%;
    }
  }
`

export const PCodeStyles = css`
  font-family: 'Ubuntu Mono', monospace;
  font-weight: 400;
  font-size: 1.8rem;
  line-height: 3.2rem;
  margin: 0;
  padding: 2px 5px;
  border-radius: 4px;
  color: ${props => props.theme.colors[props.color || 'black']};
  background-color: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.black};
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
  color: ${props => props.theme.colors[props.color || 'black']};
  background-color: ${props => props.theme.colors.white};
`
export const Code = styled.p`
  ${PreCodeStyles}
`

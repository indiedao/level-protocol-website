import styled from 'styled-components'
import PropTypes from 'prop-types'

import { COLOR_NAMES } from '../../../util/theme'

import SparkleSvg from './sparkle.svg'

const Wrapper = styled.figure`
  --sparkle-fill: ${props => props.theme.colors[props.fillColor]};
  --sparkle-stroke: ${props => props.theme.colors[props.strokeColor]};

  display: flex;
  justify-content: center;
  align-items: center;

  > svg {
    width: ${props => props.width}rem !important;
    height: ${props => props.height}rem !important;
  }
`

const Sparkle = ({ fillColor, height, strokeColor, width }) => (
  <Wrapper
    fillColor={fillColor}
    height={height}
    strokeColor={strokeColor}
    width={width}
  >
    <SparkleSvg />
  </Wrapper>
)

Sparkle.propTypes = {
  fillColor: PropTypes.oneOf(['transparent', ...COLOR_NAMES]),
  height: PropTypes.number,
  strokeColor: PropTypes.oneOf(COLOR_NAMES),
  width: PropTypes.number,
}

Sparkle.defaultProps = {
  fillColor: 'transparent',
  height: 15.1,
  strokeColor: 'white',
  width: 14.8,
}

export default Sparkle

import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

import { COLOR_NAMES } from '../../../util/theme'

import SparkleSvg from './sparkle.svg'

const Wrapper = styled.div`
  --sparkle-fill: ${props => props.theme.colors[props.fillColor]};
  --sparkle-stroke: ${props => props.theme.colors[props.strokeColor]};

  display: flex;
  justify-content: center;
  align-items: center;

  ${({ left, top }) =>
    left || top
      ? css`
          position: absolute;
          top: ${top || 0}rem;
          left: ${left || 0}rem;
        `
      : ''}

  > svg {
    width: ${props => props.width}rem !important;
    height: ${props => props.height}rem !important;
  }
`

const Sparkle = ({ fillColor, height, left, strokeColor, top, width }) => (
  <Wrapper
    fillColor={fillColor}
    height={height}
    left={left}
    strokeColor={strokeColor}
    top={top}
    width={width}
  >
    <SparkleSvg />
  </Wrapper>
)

Sparkle.propTypes = {
  fillColor: PropTypes.oneOf(['transparent', ...COLOR_NAMES]),
  height: PropTypes.number,
  left: PropTypes.number,
  strokeColor: PropTypes.oneOf(COLOR_NAMES),
  top: PropTypes.number,
  width: PropTypes.number,
}

Sparkle.defaultProps = {
  fillColor: 'transparent',
  height: 15.1,
  left: undefined,
  strokeColor: 'white',
  top: undefined,
  width: 14.8,
}

export default Sparkle

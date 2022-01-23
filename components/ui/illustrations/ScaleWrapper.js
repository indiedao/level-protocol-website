import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

const ScaleWrapper = styled.div`
  position: relative;

  > * {
    position: absolute;
    top: 50%;
    left: 50%;
    transform-origin: left top;
    transition: transform 144ms ease;
  }

  ${({ availableWidth, height, width }) =>
    availableWidth < width * 10
      ? css`
          width: ${availableWidth / 10}rem;
          height: ${((availableWidth / (width * 10)) * (height * 10)) / 10}rem;

          > * {
            transform: scale(${availableWidth / (width * 10)})
              translate(-50%, -50%);
          }
        `
      : css`
          width: ${width}rem;
          height: ${height}rem;

          > * {
            transform: translate(-50%, -50%);
          }
        `}
`

ScaleWrapper.propTypes = {
  availableWidth: PropTypes.number.isRequired, // pixels
  height: PropTypes.number.isRequired, // 10px rems
  width: PropTypes.number.isRequired, // 10px rems
}

export default ScaleWrapper

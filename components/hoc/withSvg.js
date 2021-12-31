import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

const withSvg = (icon, width, height) => {
  const SvgIcon = styled(icon)`
    ${({
      override: {
        width: overrideWidth = width,
        height: overrideHeight = height,
        strokeColor,
        fillColor,
        color,
      },
      theme: { ...theme },
    }) => css`
      width: ${overrideWidth}px;
      height: ${overrideHeight}px;

      ${(strokeColor || color) &&
      css`
        --icon-stroke: ${theme.colors[strokeColor || color]};
      `}

      ${(fillColor || color) &&
      css`
        --icon-fill: ${theme.colors[fillColor || color]};
      `}
    `}
  `

  SvgIcon.propTypes = {
    override: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number,
      strokeColor: PropTypes.string,
      fillColor: PropTypes.string,
      color: PropTypes.string,
    }),
  }

  SvgIcon.defaultProps = {
    override: {
      width,
      height: height || width,
    },
  }

  SvgIcon.displayName = `Icon(${icon.name})`

  return SvgIcon
}

export default withSvg

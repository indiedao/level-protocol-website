<<<<<<< HEAD
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
=======
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
>>>>>>> main

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
<<<<<<< HEAD
      theme: { ...theme },
=======
      theme: {...theme},
>>>>>>> main
    }) => css`
      width: ${overrideWidth}px;
      height: ${overrideHeight}px;

      ${(strokeColor || color) &&
      css`
<<<<<<< HEAD
        --icon-stroke: ${theme.colors[strokeColor || color] ||
        strokeColor ||
        color};
=======
        --icon-stroke: ${theme.colors[strokeColor || color]};
>>>>>>> main
      `}

      ${(fillColor || color) &&
      css`
<<<<<<< HEAD
        --icon-fill: ${theme.colors[fillColor || color] || fillColor || color};
      `}
    `}
  `
=======
        --icon-fill: ${theme.colors[fillColor || color]};
      `}
    `}
  `;
>>>>>>> main

  SvgIcon.propTypes = {
    override: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number,
      strokeColor: PropTypes.string,
      fillColor: PropTypes.string,
      color: PropTypes.string,
    }),
<<<<<<< HEAD
  }
=======
  };
>>>>>>> main

  SvgIcon.defaultProps = {
    override: {
      width,
      height: height || width,
    },
<<<<<<< HEAD
  }

  SvgIcon.displayName = `Icon(${icon.name})`

  return SvgIcon
}

export default withSvg
=======
  };


  SvgIcon.displayName = `Icon(${icon.name})`;

  return SvgIcon;
};

export default withSvg;
>>>>>>> main

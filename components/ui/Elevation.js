import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const Elevation = styled.div`
  overflow: hidden;
  border-radius: 0.8rem;

  ${({ theme, elevation }) => css`
    border: 0.4rem solid black;
    box-shadow: ${elevation / 10}rem ${elevation / 10}rem 0
      ${theme.colors.trueBlack};
  `}
} 
`

Elevation.propTypes = {
  elevation: PropTypes.oneOf(['8', '12', '16', null]),
}

Elevation.defaultProps = {
  elevation: '12',
}

export default Elevation

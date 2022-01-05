import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const Elevation = styled.div`
  ${({ theme, elevation }) => css`
    border-radius: 8px;
    border: 4px solid black;
    box-shadow: ${elevation}px ${elevation}px 0px ${theme.colors.trueBlack};
  `}
} 
`

Elevation.propTypes = {
  elevation: PropTypes.oneOfType(['12', '16', null]),
}

Elevation.defaultProps = {
  elevation: '12',
}

export default Elevation

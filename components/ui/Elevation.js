import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const Elevation = styled.div`
  ${({ theme, elevation }) => css`
    border-radius: 0.8rem;
    border: 0.4rem solid black;
    box-shadow: ${elevation / 10}rem ${elevation / 10}rem 0
      ${theme.colors.trueBlack};
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

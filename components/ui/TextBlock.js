import styled from 'styled-components'
import PropTypes from 'prop-types'

import { COLOR_NAMES } from '../../util/theme'

export const ALIGNMENTS = ['center', 'left']

const Text = styled.div`
  display: grid;
  justify-items: ${({ align }) => (align === 'left' ? 'start' : align)};
  grid-template-columns: 1fr;
  grid-gap: 0.8rem;
  color: ${props => props.theme.colors[props.color]};

  * {
    max-width: 68rem;
    text-align: ${({ align }) => align};
  }
`

Text.propTypes = {
  align: PropTypes.oneOf(ALIGNMENTS),
  color: PropTypes.oneOf(COLOR_NAMES),
}

Text.defaultProps = {
  align: 'center',
  color: 'trueWhite',
}

export default Text

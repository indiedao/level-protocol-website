import PropTypes from 'prop-types'
import styled from 'styled-components'

const StoryGrid = styled.div`
  color: ${props => props.theme.colors.black};
  display: grid;
  padding: 40px;
  grid-row-gap: 20px;
  grid-column-gap: 20px;
  grid-template-columns: repeat(
    ${props => props.columns},
    ${props => props.columnWidth || '1fr'}
  );
`

StoryGrid.propTypes = {
  height: PropTypes.string,
  columns: PropTypes.number,
}

StoryGrid.defaultProps = {
  height: '100px',
  columns: 1,
}

export default StoryGrid

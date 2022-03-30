import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import AccessListMember from './AccessListMember'

const AccessListMemberGrid = ({ members, size }) => (
  <Grid size={size}>
    {members.map(member => (
      <AccessListMember
        key={member._id}
        src="/images/illustrations/nft/nft.png"
        address={member.address}
        size={size}
      />
    ))}
  </Grid>
)

AccessListMemberGrid.propTypes = {
  members: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
    }),
  ).isRequired,
  size: PropTypes.oneOf(['large', 'medium', 'small']).isRequired,
}

const COLUMNS_BY_BP_BY_SIZE = {
  xl: {
    large: 8,
  },
  lg: {
    large: 6,
    medium: 8,
    small: 12,
  },
  md: {
    large: 4,
  },
  sm: {
    large: 2,
  },
}

const Grid = styled.div`
  display: grid;
  justify-items: center;
  grid-column-gap: 2.4rem;
  grid-row-gap: 3.2rem;
  margin: 0 auto;
  padding: 60px 0;

  ${({ theme: { bp }, size }) => css`
    ${bp.xl(`
      grid-template-columns: repeat(${COLUMNS_BY_BP_BY_SIZE.xl[size]}, 1fr);
      max-width: 1410px;
    `)}

    ${bp.lg(`
      grid-template-columns: repeat(${COLUMNS_BY_BP_BY_SIZE.lg[size]}, 1fr);
      max-width: 1060px;
    `)}

    ${bp.md(`
      grid-template-columns: repeat(${COLUMNS_BY_BP_BY_SIZE.md[size]}, 1fr);
      max-width: 720px;
    `)}

    ${bp.sm(`
      grid-template-columns: repeat(${COLUMNS_BY_BP_BY_SIZE.sm[size]}, 1fr);
      max-width: 360px;
    `)}
  `}
`

export default AccessListMemberGrid

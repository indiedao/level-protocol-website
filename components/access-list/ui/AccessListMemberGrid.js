import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import AccessListMember from './AccessListMember'

const AccessListMemberGrid = ({ members, size }) => (
  <Grid size={size}>
    {members.map(member => (
      <AccessListMember
        key={member._id}
        src={member.nftSrc || '/nft-loading.gif'}
        ens={member.ens || ''}
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
      nftSrc: PropTypes.string,
      ens: PropTypes.string,
    }),
  ).isRequired,
  size: PropTypes.oneOf(['large', 'medium', 'small']).isRequired,
}

const COLUMNS_BY_BP_BY_SIZE = {
  xl: {
    large: 6,
    medium: 10,
    small: 20,
  },
  lg: {
    large: 6,
    medium: 10,
    small: 20,
  },
  md: {
    large: 3,
    medium: 5,
    small: 10,
  },
  sm: {
    large: 2,
    medium: 3,
    small: 7,
  },
}

const GAP_BY_SIZE = {
  large: '2.4rem',
  medium: '2.4rem',
  small: '2rem',
}

const Grid = styled.div`
  display: grid;
  justify-items: center;
  margin: 0 auto;
  padding: 20px 0;
  grid-column-gap: ${({ size }) => GAP_BY_SIZE[size]};
  grid-row-gap: ${({ size }) => GAP_BY_SIZE[size]};

  ${({ theme: { bp }, size }) => css`
    ${bp.xl(`
      grid-template-columns: repeat(${COLUMNS_BY_BP_BY_SIZE.xl[size]}, 1fr);
      max-width: 1020px;
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

import styled from 'styled-components'
import PropTypes from 'prop-types'
import AccessListMember from './AccessListMember'

const AccessListMemberGrid = ({ members }) => (
  <Grid>
    {members.map(member => (
      <AccessListMember
        key={member._id}
        src="/images/illustrations/nft/nft.png"
        address={member.address}
        size="large"
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
}

const Grid = styled.div`
  display: grid;
  justify-items: center;
  grid-column-gap: 2.4rem;
  grid-row-gap: 3.2rem;
  margin: 0 auto;
  padding: 60px 0;

  grid-template-columns: repeat(8, 1fr);
  max-width: 1410px;

  ${({ theme }) => theme.bp.lg`
    grid-template-columns: repeat(6, 1fr);
    max-width: 1060px;
  `}

  ${({ theme }) => theme.bp.md`
    grid-template-columns: repeat(4, 1fr);
    max-width: 720px;
  `}

  ${({ theme }) => theme.bp.sm`
    grid-template-columns: repeat(2, 1fr);
    max-width: 360px;
  `}
`

export default AccessListMemberGrid

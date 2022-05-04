import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { Body1 } from '../../ui/AltTypography'
import useTruncatedAddress from '../../hooks/useTruncatedAddress'

const AccessListMember = ({ size, address, src }) => {
  const { truncatedAddress } = useTruncatedAddress(address)

  return (
    <Link href={`/token/${address}`} passHref>
      <Wrapper>
        <Avatar src={src} size={size} />
        {size !== 'small' && (
          <Address color="vibrantPixel" size={size}>
            {truncatedAddress}
          </Address>
        )}
      </Wrapper>
    </Link>
  )
}

AccessListMember.propTypes = {
  size: PropTypes.oneOf(['large', 'medium', 'small']).isRequired,
  address: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
}

const Wrapper = styled.div`
  cursor: ${props => props.theme.cursors.select};
`

const SIZES = {
  large: 15,
  medium: 6.4,
  small: 2.4,
}

const Address = styled(Body1)`
  text-shadow: 0px 2px 4px #000000;
  padding-top: 12px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${({ size }) => css`
    width: ${SIZES[size]}rem;
  `}
`

const DROP_SHADOW_BY_SIZE = {
  large: '0.4rem',
  medium: '0.2rem',
  small: '0.1rem',
}

const Avatar = styled.div`
  background: url(${({ src }) => src});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 1.6rem;

  ${({ size }) => css`
    filter: drop-shadow(
      ${DROP_SHADOW_BY_SIZE[size]} ${DROP_SHADOW_BY_SIZE[size]}
        ${DROP_SHADOW_BY_SIZE[size]} #000000
    );
    width: ${SIZES[size]}rem;
    height: ${SIZES[size]}rem;
  `}
`

export default AccessListMember

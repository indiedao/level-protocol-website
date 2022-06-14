import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { Body1 } from '../../ui/AltTypography'
import useTruncatedAddress from '../../hooks/useTruncatedAddress'

const AccessListMember = ({
  size,
  displayAddress,
  fullAddress,
  src,
  color,
}) => {
  const { truncatedAddress } = useTruncatedAddress(displayAddress)

  return (
    <Link href={`/token/${fullAddress}`} passHref>
      <Wrapper>
        <Avatar
          src={src}
          size={size}
          backgroundColor={size === 'small' ? color : 'transparent'}
        />
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
  displayAddress: PropTypes.string.isRequired,
  fullAddress: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  color: PropTypes.string,
}

AccessListMember.defaultProps = {
  color: 'transparent',
}

const SIZES = {
  large: 15,
  medium: 6.4,
  small: 2.4,
}

const Wrapper = styled.div`
  cursor: ${props => props.theme.cursors.select};
`

const Address = styled(Body1)`
  text-shadow: 0rem 0.2rem 0.4rem #000000;
  padding-top: 1.2rem;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${({ size }) => css`
    width: ${SIZES[size]}rem;
  `}
`

const DROP_SHADOW_BY_SIZE = {
  large: '0.6rem',
  medium: '0.4rem',
  small: '0.2rem',
}

const BORDER_RADIUS_BY_SIZE = {
  large: '1.6rem',
  medium: '1.2rem',
  small: '0.6rem',
}

const Avatar = styled.div`
  ${({ size }) => css`
    ${size === 'small' &&
    css`
      background-color: ${({ backgroundColor }) => backgroundColor};
    `}
    ${size !== 'small' &&
    css`
      background: url(${({ src }) => src});
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
    `}


    filter: drop-shadow(
      ${DROP_SHADOW_BY_SIZE[size]} ${DROP_SHADOW_BY_SIZE[size]} 0 #000000
    );
    border-radius: ${BORDER_RADIUS_BY_SIZE[size]};
    width: ${SIZES[size]}rem;
    height: ${SIZES[size]}rem;
  `}
`

export default AccessListMember

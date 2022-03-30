import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { Body1 } from '../../ui/AltTypography'
import useTruncatedAddress from '../../hooks/useTruncatedAddress'
import useEns from '../../hooks/useEns'

const AccessListMember = ({ size, address, src }) => {
  const { ens } = useEns(address)
  const { truncatedAddress } = useTruncatedAddress(address)

  switch (size) {
    case 'large':
      return (
        <Wrapper>
          <Avatar src={src} size={size} />
          <Address color="vibrantPixel">{ens || truncatedAddress}</Address>
        </Wrapper>
      )
    case 'medium':
      return (
        <Wrapper>
          <Avatar src={src} size={size} />
          <Address color="vibrantPixel">{ens || truncatedAddress}</Address>
        </Wrapper>
      )
    case 'small':
      return (
        <Wrapper>
          <Avatar src={src} size={size} />
        </Wrapper>
      )
    default:
      return <>Error: Unknown size.</>
  }
}

AccessListMember.propTypes = {
  size: PropTypes.oneOf(['large', 'medium', 'small']).isRequired,
  address: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
}

const Wrapper = styled.div``

const Address = styled(Body1)`
  text-shadow: 0px 2px 4px #000000;
  padding-top: 12px;
`

const SIZES = {
  large: 15,
  medium: 10,
  small: 5,
}

const Avatar = styled.div`
  background: url(${({ src }) => src});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  filter: drop-shadow(0.4rem 0.4rem 0.4rem #000000);
  border-radius: 1.6rem;

  ${({ size }) => css`
    width: ${SIZES[size]}rem;
    height: ${SIZES[size]}rem;
  `}
`

export default AccessListMember

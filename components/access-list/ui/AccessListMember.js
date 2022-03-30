import styled from 'styled-components'
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
          <Avatar src={src} />
          <Address color="vibrantPixel">{ens || truncatedAddress}</Address>
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

const Avatar = styled.div`
  background: url(${({ src }) => src});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  filter: drop-shadow(0.4rem 0.4rem 0.4rem #000000);
  border-radius: 1.6rem;
  width: 15rem;
  height: 15rem;
`

export default AccessListMember

import styled from 'styled-components'
import Link from 'next/link'
import Image from 'next/image'

// TODO: HOOK MISSING
// eslint-disable-next-line import/no-unresolved,import/extensions
import useWeb3 from '../../components/hooks/useWeb3'
import { Button } from './Buttons'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
`

const DesktopLogo = styled.div`
  padding-top: 5px;
  ${props => props.theme.bp.sm`
    display: none;
  `}
`

const MobileLogo = styled.div`
  display: none;
  ${props => props.theme.bp.sm`
    display: block;
  `}
`

const maskAddress = address =>
  typeof address === 'string'
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : ''

const Nav = () => {
  const { connect, disconnect, accounts } = useWeb3()
  const connected = accounts.length > 0

  return (
    <Wrapper>
      <Link href="/" passHref>
        <div>
          <DesktopLogo>
            <Image alt="logo" height={40} src="/images/logo.svg" />
          </DesktopLogo>
          <MobileLogo>
            <Image alt="svg" height={60} src="/images/star.svg" />
          </MobileLogo>
        </div>
      </Link>
      <div>
        {!connected && <Button onClick={connect}>Connect</Button>}
        {connected && (
          <Button onClick={disconnect}>{maskAddress(accounts[0])}</Button>
        )}
      </div>
    </Wrapper>
  )
}

export default Nav

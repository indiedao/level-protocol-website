import styled from 'styled-components'

// TODO: MISSING CONSTANT
// eslint-disable-next-line import/no-unresolved,import/extensions
import { IndieAddress } from '../../util/constants'
import { A } from './Typography'

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  height: 75px;
  width: 100%;
  background-color: ${props => props.theme.colors.base900};
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    padding: 0 5px;
  }
`

const Footer = () => (
  <Wrapper>
    <A href="https://twitter.com/theindiedao" target="_blank" color="white">
      @theindiedao
    </A>
    <span>|</span>
    <A
      href={`https://etherscan.io/token/${IndieAddress}#balances`}
      target="_blank"
      color="white"
    >
      $INDIE
    </A>
    <span>|</span>
    <A
      href="https://etherscan.io/address/0x762C0cefBdC51D3ca0553b81792D82fcA96EF7a3"
      target="_blank"
      color="white"
    >
      IndieDAO Multi-Sig
    </A>
  </Wrapper>
)

export default Footer

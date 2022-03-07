import styled from 'styled-components'
import { Body1 } from '../../ui/Typography'

const Wrapper = styled.div`
  position: absolute;
  top: 38px;
  left: 80px;
  background-color: yellow;
`

const NFTCountOverlay = ({ count, total }) => (
  <Wrapper>
    <Body1>
      {count}/{total}
    </Body1>
  </Wrapper>
)

export default NFTCountOverlay

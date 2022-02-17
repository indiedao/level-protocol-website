import styled from 'styled-components'

const PFP = ({ src }) => (
  <Wrapper>
    <Img src={src} />
    <Border />
  </Wrapper>
)

const Wrapper = styled.div`
  height: 100%;
  position: relative;
`

const Img = styled.img`
  height: 100%;
  max-height: 144px;
  object-fit: cover;
  border-radius: 50%;
  overflow: hidden;
  padding: 2px;
`

const Border = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(/images/pixel-circle.png);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`

export default PFP

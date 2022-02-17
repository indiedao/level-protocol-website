import styled from 'styled-components'

const NFTArrowTokenViewContainer = styled.div`
  position: relative;

  &:after {
    content: '';
    position: absolute;
    background: url(/images/pixel-arrow.png);
    top: 28px;
    left: 30px;
    height: 44px;
    width: 24px;
    transform: scaleX(-1);
  }

  &:before {
    content: '';
    position: absolute;
    background: url(/images/pixel-arrow.png);
    top: 28px;
    right: 30px;
    height: 44px;
    width: 24px;
  }
`

export default NFTArrowTokenViewContainer

import styled, { keyframes } from 'styled-components'
import { H4 } from '../../ui/AltTypography'

const StatusIndicator = ({ message }) => (
  <Wrapper>
    <Indicator src="/images/status-indicator-red.png" />
    <H4 color="vibrantPixel">{message}</H4>
  </Wrapper>
)

const Wrapper = styled.div`
  position: absolute;
  top: 43px;
  left: 48px;
  display: flex;
  align-items: center;
`

const glow = keyframes`
  0% {
    box-shadow: 0px 0px 0px #ff0707;
  }
  50% {
    box-shadow: 0px 0px 30px #ff0707;
  }
  100% {
    box-shadow: 0px 0px 0px #ff0707;
  }
`

const Indicator = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 10px;
  border-radius: 8px;
  animation: ${glow} 2s infinite forwards;
`

export default StatusIndicator

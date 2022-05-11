import styled, { keyframes } from 'styled-components'

import { H4 } from '../../ui/AltTypography'

const Wrapper = styled.div`
  position: absolute;
  top: clamp(1.5rem, 5vw, 2.4rem);
  left: clamp(1rem, 4vw, 1.8rem);
  display: flex;
  align-items: center;
  transform: translateY(-50%);
`

const glow = keyframes`
  0% {
    box-shadow: 0 0 0 #ff0707;
  }
  50% {
    box-shadow: 0 0 3rem #ff0707;
  }
  100% {
    box-shadow: 0 0 0 #ff0707;
  }
`

const Indicator = styled.span`
  width: min(4vw, 1.6rem);
  height: min(4vw, 1.6rem);
  margin-right: min(3vw, 1rem);
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAALFSURBVHgBXZO7ctNAFIb/vUiWZMuxycWOMWAgRbq4TMEMuKZIXiElHTxBnCcA3gK6pGAogRkaZij0BvEk4DiJ7xfZkqVdjhyTCWjmSFppv/8/e84uw3/X21zuhSnEPgf2OGMVRt/o6UEpb24YR69arcbd+ewOmDM4PxSMvbYYg805TAqx/B8JjtAyMXdS72IRHB14jf6twBL+kuK86hKUFWIRDgkZFDANBCsOphkbwzjGuDfy/ElYO2g0+jIRSJzJrbpC0JqUWKdIhJwkA3LFWg7RxgqmNB5cddEBqsN4fkjoG0buFUuI0wQuGgaKBK9SJLCZtsAfFqC3SlD0Hpxewm800bvqoaViDKSoSSlEnVJHIrC6DHcB2+CVItjTEpBNQzWvITsDiKGPiJYSmhxKx/uSirZj0zrdpYhDYSTOjzdvYNeBvmiD/2oDrS4sGrsbGYwtwO4O9yS1q2qSQJrApPKGY0FUCHyySc4O0GyDnV9DJ0/HBC/nYRZsOFDoTYIKIYAkgUREUsH4owLYVukWBsFoUtkIxoN7YOUsRM6CjDmYFqA7u9kYBjVkPQ9Q2tq1wS460Gfk/Lu9gFn5HnA/S8IkFDCwmYKOmce5UicxbZJ5LkOtykJRgRJHfXYF1uqApU1oShtldwHrmYYaR4jGc6hZ6PE5Y8eBnYKfsTCjBYWNFuLzS+CiC20bt2kjm4IOAOUrzEYhxsMp5gpH4pPvN/ZLhbww5W5qGkJ2RzDa1C4nBbaE9SJtjXgSIxiG6Pcm6I3898++/fiw2ImRDOqjvn7eVqjKSNEyqFVFl6rtgKcl2EQh9qOF86Dn47o78ibjoJ6wi7Ny0urPXjruRzYN7FiwXWRtzDYchI5ASCn7gxCj/hTt7hhdcvZHwUHN8/r/nMa/1+ft7YqRN+rpnLXDhVFVTEBFaOgwPpkH4XHt+8+vd+f/AW+7HfFMxEtrAAAAAElFTkSuQmCC');
  border-radius: 1000rem;
  animation: ${glow} 2s infinite forwards;
`

const Message = styled(H4)`
  font-size: min(5vw, 1.8rem);
  transform: translateY(5%);

  @media (min-width: 320px) {
    font-size: min(4.5vw, 1.8rem);
  }

  @media (min-width: 420px) {
    font-size: min(4vw, 1.8rem);
  }
`

const StatusIndicator = ({ message }) => (
  <Wrapper>
    <Indicator />
    <Message color="vibrantPixel">{message}</Message>
  </Wrapper>
)

export default StatusIndicator

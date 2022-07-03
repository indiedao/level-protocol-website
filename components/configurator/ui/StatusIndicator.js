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
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACs0lEQVR4AWJkQAP9AgIOAKbJE8iRIwyjr//JcXPOqcrMy9lycMeZ4bHl4AInFgfmxIGDO2g4nPjyKseRrMnucVZV537/+yTN2IbxXOCZKHWpAD0m1HVSWNabF93ue/73Uf8DNy2RV4ZSj65SeCLYuhkAQGkIuWtT+M73lZG9+S55PwWQ/8FvHZHHLcPgwLI4tW0u9Xitx+sw4OJwh9PTfXY2wke/sN/+cHm5+W+B1qxt9xsa3tfQmYZO/y5yHAUcn+xzdn3C2eFuu88e3G9VxSsAU9sv29ihCLumyaFuO7r5ItiBi5wf0NweU+u5+1sPp6iwihoc+/Gnb25/EdMwXuvotPadv1skghd4WJdHmHenWBsRVn9KMJoRzVdEocf2bky04T43tf1bTymiv4v4ulmt+eoIdXMMkU/zNEQ+D6E7xtXraD8kdcEbz59pjHtbKQINeiJYvotxqcHrI4h90LD6NKD5OgTfRk63sM9i/L0Q5TiXGgFTKWzdTNdGLg5Q+ju3MC2kYb6OWhjOtlGnMcami1kJqjEQlHoPgGXC3hbo2E3koZ5GNB+1+cufZg1uw0kMsQ2ZQq1rmkolInX9S2UIxWZIuR9Th15r1HAf1R2hAptGx+Y0amGadUOdlpRpQb3OEymU+jnzHFahy1qE/H2X6lMPnsY0nvVvbGKHJoN6VbNe5KTz3ylq3siL4fBd6dqdeVky641J3z+R69h1C/8du2nNWUO1LFnPM+bTFely3Xl49+t7ASjN7PViukiGusBUt4khLA8jsgOfPDAplzXZvCCdrhmOUvrjRbKcZ68BBKB9MVZp/jCbrzq9umLkCF1PMaBkPNbQcEV/kPKlP6M7XXTSNHt4SJIpfwwb2K6hobDHUnfBcU/T8yd9rP4f97X9f9TT9v4RZ6sJ+21MHNDVAwCyPxJ5eBBiuwAAAABJRU5ErkJggg==');
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

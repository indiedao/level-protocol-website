import styled, { keyframes } from 'styled-components'
import { H2, H4 } from '../../ui/AltTypography'
import TypeItOut from '../../ui/TypeItOut'

const ConfiguratorPrompt = ({ message, action }) => (
  <Wrapper>
    <H2 color="vibrantPixel">
      <TypeItOut message={message} />
    </H2>
    <ButtonGroup>
      <H4 color="vibrantPixel">{action}</H4>
      <A>
        <H2>A</H2>
      </A>
    </ButtonGroup>
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`

const ButtonGroup = styled.div`
  padding-top: 24px;
  display: flex;
  align-items: center;

  > :first-child {
    margin-right: 10px;
  }
`

const glow = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`

const A = styled.div`
  background-color: ${({ theme }) => theme.colors.mutedGreen};
  width: 50px;
  height: 50px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
  animation: ${glow} 1.5s infinite forwards;

  > h2 {
    margin-left: 3px;
  }
`

export default ConfiguratorPrompt

import styled from 'styled-components'

const Frame = styled.div`
  background-color: ${props => props.theme.colors.mutedGray};
  padding: 46px 17px 17px;
  box-shadow: inset 0px 0px 32px rgba(0, 0, 0, 0.75),
    inset 0px -16px 24px rgba(255, 255, 255, 0.25),
    inset 0px 8px 16px rgba(255, 255, 255, 0.25);
  border-radius: 8px;
`

const Screen = styled.div`
  display: grid;
  grid-template-rows: 93px auto;
  background-color: ${props => props.theme.colors.vibrantScreen};
  padding: 20px 20px;
  box-shadow: inset 0px 0px 16px #000000;
  height: 100%;
`

const ConfiguratorScreen = ({ children }) => (
  <Frame>
    <Screen>{children}</Screen>
  </Frame>
)

export default ConfiguratorScreen

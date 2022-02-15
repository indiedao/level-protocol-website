import styled from 'styled-components'
import { Body1, Body2 } from '../../ui/Typography'

const Wrapper = styled.div``

const ConfiguratorPrompt = ({ message, action }) => (
  <Wrapper>
    <Body1>{message}</Body1>
    <h1>a</h1>
    <Body2>{action}</Body2>
  </Wrapper>
)

export default ConfiguratorPrompt

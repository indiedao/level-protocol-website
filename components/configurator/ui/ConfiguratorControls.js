import styled from 'styled-components'
import { Body1 } from '../../ui/Typography'

const ConfiguratorControls = ({ up, down, left, right, a, b }) => (
  <Wrapper>
    <DPad>
      <Body1 onClick={up}>UP</Body1>
      <Body1 onClick={down}>DOWN</Body1>
      <Body1 onClick={left}>LEFT</Body1>
      <Body1 onClick={right}>RIGHT</Body1>
    </DPad>
    <AButton onClick={a}>A</AButton>
    <BButton onClick={b}>B</BButton>
  </Wrapper>
)

const Wrapper = styled.div``
const DPad = styled.div``
const AButton = styled.div``
const BButton = styled.div``

export default ConfiguratorControls

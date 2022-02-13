import styled from 'styled-components'
import { Body1 } from '../../ui/Typography'

const ConfiguratorControls = ({ up, down, left, right }) => (
  <DPad>
    <Body1 onClick={up}>UP</Body1>
    <Body1 onClick={down}>DOWN</Body1>
    <Body1 onClick={left}>LEFT</Body1>
    <Body1 onClick={right}>RIGHT</Body1>
  </DPad>
)

const DPad = styled.div``

export default ConfiguratorControls

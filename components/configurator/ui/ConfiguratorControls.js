import styled from 'styled-components'

import DPad from './DPad'

const ConfiguratorControls = ({ up, down, left, right, a, b }) => (
  <Wrapper>
    <DPad up={up} down={down} left={left} right={right} />
    <AButton onClick={a}>A</AButton>
    <BButton onClick={b}>B</BButton>
  </Wrapper>
)

const Wrapper = styled.div``
const AButton = styled.div``
const BButton = styled.div``

export default ConfiguratorControls

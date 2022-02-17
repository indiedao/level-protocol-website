import styled from 'styled-components'

import LvlSvg from '../assets/lvl.svg'
import DPad from './DPad'
import ABPad from './ABPad'

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(2, auto);
  grid-template-rows: 3rem 1fr;
  height: 26rem;

  > *:nth-child(1) {
    grid-column: 1 / span 2;
  }
`

const ConfiguratorControls = ({ up, down, left, right, a, b }) => (
  <Wrapper>
    <LvlSvg />
    <DPad up={up} down={down} left={left} right={right} />
    <ABPad a={a} b={b} />
  </Wrapper>
)

export default ConfiguratorControls

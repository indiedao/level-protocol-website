import styled from 'styled-components'

import LvlSvg from '../assets/lvl.svg'
import DPad from './DPad'
import ABPad from './ABPad'
import { playSound } from '../../../util/audio'

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
    <DPad
      up={() => {
        playSound('button3_clean.wav')
        up()
      }}
      down={() => {
        playSound('button3_clean.wav')
        down()
      }}
      left={() => {
        playSound('button3_clean.wav')
        left()
      }}
      right={() => {
        playSound('button3_clean.wav')
        right()
      }}
    />
    <ABPad
      a={() => {
        playSound('button_a_clean.wav')
        a()
      }}
      b={() => {
        playSound('button_cancel.wav')
        b()
      }}
    />
  </Wrapper>
)

export default ConfiguratorControls

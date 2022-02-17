import styled from 'styled-components'

import LvlSvg from '../assets/lvl.svg'
import DPad from './DPad'
import ABPad from './ABPad'
import { playSound } from '../../../util/audio'

const FULL_WIDTH = 444

const ExternalWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  max-width: calc(100vw - 6.4rem);
  max-height: calc(26rem * ((320 - 64) / ${FULL_WIDTH}));

  @media (min-width: 375px) {
    max-height: calc(26rem * ((375 - 64) / ${FULL_WIDTH}));
  }

  @media (min-width: 420px) {
    max-height: calc(26rem * ((420 - 64) / ${FULL_WIDTH}));
  }

  @media (min-width: 500px) {
    max-height: 26rem;
  }
`

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(2, auto);
  grid-template-rows: 3rem 1fr;
  margin: 0 auto auto;
  height: 26rem;
  transform: scale(calc((320 - 64) / ${FULL_WIDTH}));
  transform-origin: center top;

  @media (min-width: 375px) {
    transform: scale(calc((375 - 64) / ${FULL_WIDTH}));
  }

  @media (min-width: 420px) {
    transform: scale(calc((420 - 64) / ${FULL_WIDTH}));
  }

  @media (min-width: 500px) {
    transform: scale(1);
  }

  > *:nth-child(1) {
    grid-column: 1 / span 2;
  }
`

const ConfiguratorControls = ({ up, down, left, right, a, b }) => (
  <ExternalWrap>
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
  </ExternalWrap>
)

export default ConfiguratorControls

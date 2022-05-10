import styled from 'styled-components'
import PropTypes from 'prop-types'

import LvlSvg from '../assets/lvl.svg'
import DPad from './DPad'
import ABPad from './ABPad'
import { playSound } from '../../../util/audio'

const Controls = styled.div`
  position: relative;
  display: grid;
  align-items: center;
  grid-template-columns: repeat(2, auto);
  width: 100%;
  max-width: calc(100vw - 3.2rem);
  min-height: min(40vw, 24rem);
  z-index: 0;

  @media (min-width: 320px) {
    max-width: calc(100vw - 6.4rem);
  }

  > svg:first-child {
    position: absolute;
    top: 0;
    left: 50%;
    height: 10vw;
    max-height: 4.8rem;
    transform: translateX(-50%);
    z-index: -1;
  }
`

const ConfiguratorControls = ({ up, down, left, right, a, b }) => (
  <Controls>
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
  </Controls>
)

ConfiguratorControls.propTypes = {
  up: PropTypes.func,
  down: PropTypes.func,
  left: PropTypes.func,
  right: PropTypes.func,
  a: PropTypes.func,
  b: PropTypes.func,
}

ConfiguratorControls.defaultProps = {
  up: () => null,
  down: () => null,
  left: () => null,
  right: () => null,
  a: () => null,
  b: () => null,
}

export default ConfiguratorControls

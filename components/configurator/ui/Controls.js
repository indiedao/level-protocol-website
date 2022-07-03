import { useCallback, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import LvlSvg from '../assets/lvl.svg'
import DPad from './DPad'
import ABPad from './ABPad'
import { playSound } from '../../../util/audio'

const Pads = styled.div`
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

const Controls = ({ up, down, left, right, a, b }) => {
  const handleUp = useCallback(() => {
    playSound('button3_clean.wav')
    up()
  }, [up])

  const handleDown = useCallback(() => {
    playSound('button3_clean.wav')
    down()
  }, [down])

  const handleLeft = useCallback(() => {
    playSound('button3_clean.wav')
    left()
  }, [left])

  const handleRight = useCallback(() => {
    playSound('button3_clean.wav')
    right()
  }, [right])

  const handleA = useCallback(() => {
    playSound('button3_clean.wav')
    a()
  }, [a])

  const handleB = useCallback(() => {
    playSound('button3_clean.wav')
    b()
  }, [b])

  useEffect(() => {
    const handler = e => {
      switch (e.key) {
        case 'ArrowUp':
          handleUp()
          break
        case 'ArrowDown':
          handleDown()
          break
        case 'ArrowLeft':
          handleLeft()
          break
        case 'ArrowRight':
          handleRight()
          break
        case 'Enter':
        case 'a':
          handleA()
          break
        case 'Backspace':
        case 'b':
          handleB()
          break
        default:
        // no default
      }
    }

    window.addEventListener('keydown', handler)

    return () => {
      window.removeEventListener('keydown', handler)
    }
  }, [handleA, handleB, handleDown, handleLeft, handleRight, handleUp])

  return (
    <Pads>
      <LvlSvg />
      <DPad
        up={handleUp}
        down={handleDown}
        left={handleLeft}
        right={handleRight}
      />
      <ABPad a={handleA} b={handleB} />
    </Pads>
  )
}

Controls.propTypes = {
  up: PropTypes.func,
  down: PropTypes.func,
  left: PropTypes.func,
  right: PropTypes.func,
  a: PropTypes.func,
  b: PropTypes.func,
}

Controls.defaultProps = {
  up: () => null,
  down: () => null,
  left: () => null,
  right: () => null,
  a: () => null,
  b: () => null,
}

export default Controls

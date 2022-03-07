import { useEffect } from 'react'
import ConfiguratorControls from '../ui/ConfiguratorControls'
import { playSound } from '../../../util/audio'

const ConfiguratorControlsView = props => {
  const { up, down, left, right, a, b } = props

  useEffect(() => {
    const handler = e => {
      switch (e.key) {
        case 'ArrowUp':
          playSound('button3_clean.wav')
          up()
          break
        case 'ArrowDown':
          playSound('button3_clean.wav')
          down()
          break
        case 'ArrowLeft':
          playSound('button3_clean.wav')
          left()
          break
        case 'ArrowRight':
          playSound('button3_clean.wav')
          right()
          break
        case 'Enter':
        case 'a':
          playSound('button_a_clean.wav')
          a()
          break
        case 'Backspace':
        case 'b':
          playSound('button_cancel.wav')
          b()
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handler)

    return () => {
      window.removeEventListener('keydown', handler)
    }
  })
  return <ConfiguratorControls {...props} />
}

ConfiguratorControlsView.defaultProps = {
  up: () => {},
  down: () => {},
  left: () => {},
  right: () => {},
  a: () => {},
  b: () => {},
}

export default ConfiguratorControlsView

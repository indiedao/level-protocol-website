import { useEffect } from 'react'
import ConfiguratorControls from '../ui/ConfiguratorControls'

const ConfiguratorControlsView = props => {
  const { up, down, left, right, a, b } = props

  useEffect(() => {
    const handler = e => {
      switch (e.key) {
        case 'ArrowUp':
          up()
          break
        case 'ArrowDown':
          down()
          break
        case 'ArrowLeft':
          left()
          break
        case 'ArrowRight':
          right()
          break
        case 'Enter':
        case 'a':
          a()
          break
        case 'Backspace':
        case 'b':
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

export default ConfiguratorControlsView

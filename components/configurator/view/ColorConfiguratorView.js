import useConfigurator from '../../hooks/useConfigurator'
import ConfiguratorControlsView from './ConfiguratorControlsView'
import ColorPreview from '../ui/ColorPreview'

const HUE_OFFSET = 10
const MAX_HUE = 360
const MIN_HUE = 0
const LIGHTNESS_OFFSET = 5
const MAX_LIGHTNESS = 80
const MIN_LIGHTNESS = 30

const ColorConfiguratorView = () => {
  const {
    setColorHue,
    setColorLightness,
    colorHue,
    colorLightness,
    nextStep,
    previousStep,
  } = useConfigurator()

  const handleUp = () => {
    if (colorLightness < MAX_LIGHTNESS - LIGHTNESS_OFFSET) {
      setColorLightness(colorLightness + LIGHTNESS_OFFSET)
    }
  }

  const handleDown = () => {
    if (colorLightness > MIN_LIGHTNESS + LIGHTNESS_OFFSET) {
      setColorLightness(colorLightness - LIGHTNESS_OFFSET)
    }
  }

  const handleLeft = () => {
    if (colorHue > MIN_HUE + HUE_OFFSET) {
      setColorHue(colorHue - HUE_OFFSET)
    } else {
      // Rotate through color wheel:
      setColorHue(360)
    }
  }

  const handleRight = () => {
    if (colorHue < MAX_HUE - HUE_OFFSET) {
      setColorHue(colorHue + HUE_OFFSET)
    } else {
      // Rotate through color wheel:
      setColorHue(0)
    }
  }

  return (
    <div>
      <ColorPreview hue={colorHue} lightness={colorLightness} />
      <ConfiguratorControlsView
        up={handleUp}
        down={handleDown}
        right={handleRight}
        left={handleLeft}
        a={nextStep}
        b={previousStep}
      />
    </div>
  )
}

export default ColorConfiguratorView

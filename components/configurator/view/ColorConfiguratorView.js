import { useEffect } from 'react'
import useConfigurator from '../../hooks/useConfigurator'
import ConfiguratorNavView from './ConfiguratorNavView'
import TokenView from '../../token/view/TokenView'
import Device from '../ui/Device'
import Screen from '../ui/Screen'
import useWeb3 from '../../hooks/useWeb3'
import hslToHex from '../../../util/hslToHex'

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
    nftId,
    nftAddress,
    setStatusIndicator,
  } = useConfigurator()
  const { address } = useWeb3()

  // Update status indicator with color:
  useEffect(() => {
    setStatusIndicator({
      message: hslToHex(colorHue, 100, colorLightness),
    })
  }, [setStatusIndicator, colorHue, colorLightness])

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
    <Device
      up={handleUp}
      down={handleDown}
      right={handleRight}
      left={handleLeft}
      a={nextStep}
      b={previousStep}
    >
      <Screen>
        <ConfiguratorNavView />
        <div>
          <TokenView
            address={address}
            nftId={nftId}
            nftAddress={nftAddress}
            colorHue={colorHue}
            colorLightness={colorLightness}
          />
        </div>
      </Screen>
    </Device>
  )
}

export default ColorConfiguratorView

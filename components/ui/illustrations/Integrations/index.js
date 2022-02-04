import styled from 'styled-components'
import Image from 'next/image'
import PropTypes from 'prop-types'

import ScaleWrapper from '../ScaleWrapper'
import NonInteractiveWindow from '../../NonInteractiveWindow'
import Sparkle from '../../Sparkle/Sparkle'
import IntegrationsRingSvg from './integrations-ring.svg'
import LevelSvg from './level.svg'

const WIDTH = 58.1
const HEIGHT = 51.4

const Illustration = styled.div`
  display: grid;
  align-items: end;
  grid-template-columns: 1fr;
  width: ${WIDTH}rem;
  height: ${HEIGHT}rem;
`

const BackgroundWindow = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 0;
`

const ForegroundWindow = styled.div`
  position: relative;
`

const IntegrationRing = styled(IntegrationsRingSvg)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, calc(-50% - 2.2rem));
  z-index: 2;
`

const Level = styled(LevelSvg)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(calc(-50% - 0.4rem), calc(-50% - 2.2rem));
  z-index: 3;
`

const Integrations = ({ availableWidth }) => (
  <ScaleWrapper availableWidth={availableWidth} height={HEIGHT} width={WIDTH}>
    <Illustration>
      <BackgroundWindow>
        <NonInteractiveWindow
          caption="an image of a volt meter gauge"
          height={37}
          title="preview"
          titleBarBackgroundColor="mutedBlue"
          width={33.7 + 0.8}
        >
          <Image
            alt=""
            height="315"
            src="/images/illustrations/integrations/volts.png"
            width="337"
          />
        </NonInteractiveWindow>
      </BackgroundWindow>
      <ForegroundWindow>
        <NonInteractiveWindow
          caption="a diagram demonstrating the options for connecting your favorite community integration"
          height={47.6 + 0.4}
          overflow="visible"
          title="skillz"
          width={44.6 + 0.8}
        >
          <IntegrationRing />
          <Level />
        </NonInteractiveWindow>
      </ForegroundWindow>
      <Sparkle
        height={11.6}
        left={46.8}
        strokeColor="trueWhite"
        top={33.8}
        width={12.2}
      />
    </Illustration>
  </ScaleWrapper>
)

Integrations.propTypes = {
  availableWidth: PropTypes.number,
}

Integrations.defaultProps = {
  availableWidth: 1152,
}

export default Integrations

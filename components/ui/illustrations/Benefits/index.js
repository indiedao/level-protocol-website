import styled from 'styled-components'
import Image from 'next/image'
import PropTypes from 'prop-types'

import ScaleWrapper from '../ScaleWrapper'
import NonInteractiveWindow from '../../NonInteractiveWindow'
import Sparkle from '../../Sparkle/Sparkle'
import VortexSvg from './through-the-vortex.svg'

const WIDTH = 58.1
const HEIGHT = 56.5

const Illustration = styled.div`
  position: relative;
  display: grid;
  justify-items: end;
  align-items: end;
  grid-template-columns: 1fr;
  width: ${WIDTH}rem;
  height: ${HEIGHT}rem;
`

const BackgroundWindow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
`

const ForegroundWindow = styled.div`
  position: relative;
  margin-bottom: ${(3.3 / HEIGHT) * 100}%;

  figure {
    background: ${props => props.theme.colors.trueWhite}
      ${props => props.theme.halftones.sm};
  }
`

const Vortex = styled(VortexSvg)`
  position: absolute;
  top: 50%;
  right: ${(3.8 / 34.1) * 100}%;
  transform: translateY(-50%);
  z-index: 2;
`

const Benefits = ({ availableWidth }) => (
  <ScaleWrapper availableWidth={availableWidth} height={HEIGHT} width={WIDTH}>
    <Illustration>
      <BackgroundWindow>
        <NonInteractiveWindow
          caption="an image of pattern"
          height={56.5}
          title="members"
          titleBarBackgroundColor="mutedBlack"
          width={47.2}
        >
          <Image
            alt=""
            height="510"
            src="/images/illustrations/benefits/pattern.png"
            width="472"
          />
        </NonInteractiveWindow>
      </BackgroundWindow>
      <ForegroundWindow>
        <NonInteractiveWindow
          caption="a woman moving between two distinct groups"
          height={43.7 + 0.4}
          overflow="visible"
          title="skillz"
          width={34.1 + 0.8}
        >
          <Vortex />
        </NonInteractiveWindow>
      </ForegroundWindow>
      <Sparkle
        fillColor="trueWhite"
        height={11}
        left={17.3}
        strokeColor="trueBlack"
        top={12}
        width={10.7}
      />
      <Sparkle
        fillColor="trueWhite"
        height={7}
        left={47.2}
        strokeColor="trueBlack"
        top={42.7}
        width={6.8}
      />
    </Illustration>
  </ScaleWrapper>
)

Benefits.propTypes = {
  availableWidth: PropTypes.number,
}

Benefits.defaultProps = {
  availableWidth: 1152,
}

export default Benefits

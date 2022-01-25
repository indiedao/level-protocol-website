import styled from 'styled-components'
import Image from 'next/image'
import PropTypes from 'prop-types'

import ScaleWrapper from '../ScaleWrapper'
import NonInteractiveWindow from '../../NonInteractiveWindow'
import Elevation from '../../Elevation'
import Sparkle from '../../Sparkle/Sparkle'
import Avatar01Svg from './avatar-01.svg'
import Avatar02Svg from './avatar-02.svg'
import Avatar03Svg from './avatar-03.svg'
import Avatar04Svg from './avatar-04.svg'

const WIDTH = 58.2
const HEIGHT = 50.6

const Illustration = styled.div`
  position: relative;
  display: grid;
  align-items: end;
  grid-template-columns: 1fr;
  width: ${WIDTH}rem;
  height: ${HEIGHT}rem;
`

const BackgroundWindow = styled.div`
  position: absolute;
  bottom: ${(2.2 / HEIGHT) * 100}%;
  left: ${(7 / WIDTH) * 100}%;
  z-index: 0;
`

const BackgroundWindowBackground = styled.div`
  width: 100%;
  height: 100%;
  background: ${props => props.theme.halftones.lg},
    ${props => props.theme.halftones.xs};
`

const ForegroundWindow = styled.div`
  position: relative;
`

const Avatar = styled(Elevation)`
  position: absolute;
  top: calc(${props => ((props.top || 0) / HEIGHT) * 100}% + 0.4rem);
  left: calc(${props => ((props.left || 0) / WIDTH) * 100}% + 0.4rem);
  width: calc(${props => ((props.width || 9.6) / WIDTH) * 100}% + 0.4rem);
  height: calc(${props => ((props.height || 9.6) / HEIGHT) * 100}% + 0.4rem);

  > svg {
    transform: translate(-0.2rem, -0.2rem);
  }
`

const Select = styled.div`
  position: absolute;
  top: ${(40.9 / HEIGHT) * 100}%;
  left: ${(28.3 / WIDTH) * 100}%;
`

const Skillz = ({ availableWidth }) => (
  <ScaleWrapper availableWidth={availableWidth} height={HEIGHT} width={WIDTH}>
    <Illustration>
      <BackgroundWindow>
        <NonInteractiveWindow
          caption="just a background"
          height={38.9}
          title="hidden"
          titleBarBackgroundColor="mutedBlue"
          width={45.5}
        >
          <BackgroundWindowBackground />
        </NonInteractiveWindow>
      </BackgroundWindow>
      <ForegroundWindow>
        <NonInteractiveWindow
          caption="an illustration of skills moving between groups or organizations"
          height={47.6}
          title="skillz"
          width={41.1}
        >
          <Image
            alt=""
            height="425"
            src="/images/illustrations/skillz/skillz.png"
            width="411"
          />
        </NonInteractiveWindow>
      </ForegroundWindow>
      <Avatar elevation={8} left={11.7} top={32.2}>
        <Avatar01Svg />
      </Avatar>
      <Avatar elevation={8} height={12.1} left={22.9} top={29.4} width={12.1}>
        <Avatar02Svg />
      </Avatar>
      <Avatar elevation={8} left={36.6} top={34.6}>
        <Avatar03Svg />
      </Avatar>
      <Avatar elevation={8} left={47.8} top={31.4}>
        <Avatar04Svg />
      </Avatar>
      <Select>
        <Image
          alt=""
          height="56"
          src="/images/illustrations/skillz/select.png"
          width="56"
        />
      </Select>
      <Sparkle
        height={7.9}
        left={-2.6}
        strokeColor="vibrantRed"
        top={41.1}
        width={7.7}
      />
      <Sparkle
        height={12.2}
        left={47.5}
        strokeColor="vibrantGreen"
        top={16}
        width={11.9}
      />
    </Illustration>
  </ScaleWrapper>
)

Skillz.propTypes = {
  availableWidth: PropTypes.number,
}

Skillz.defaultProps = {
  availableWidth: 1152,
}

export default Skillz

import styled from 'styled-components'
import Image from 'next/image'

import NonInteractiveWindow from '../../NonInteractiveWindow'
import Sparkle from '../../Sparkle/Sparkle'

const WIDTH = 58.2
const HEIGHT = 56.2

const Illustration = styled.div`
  position: relative;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr;
  width: ${WIDTH}rem;
  height: ${HEIGHT}rem;
`

const BackgroundWindow = styled.div`
  position: absolute;
  top: 0;
  left: ${(10.9 / WIDTH) * 100}%;
  z-index: 0;
`

const ForegroundWindow = styled.div`
  position: relative;
`

const Token = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 100%;
  height: 100%;
  overflow: hidden;

  > *:first-child {
    position: absolute !important;
    top: 50%;
    width: 100%;
    transform: translateY(-50%);
  }
`

const Communities = () => (
  <Illustration>
    <BackgroundWindow>
      <NonInteractiveWindow
        caption="an ethereal waveform-like image"
        height={HEIGHT}
        title="off the chain"
        titleBarBackgroundColor="mutedBlack"
        width={47.2}
      >
        <Image
          alt=""
          height="507"
          src="/images/illustrations/communities/off-the-chain.png"
          width="468"
        />
      </NonInteractiveWindow>
    </BackgroundWindow>
    <ForegroundWindow>
      <NonInteractiveWindow
        caption="an illustration of a retro version of the Level Protocol NFT"
        contentBackgroundColor="mutedBlack"
        height={39.4 + 0.4}
        title="token"
        width={34.1 + 0.8}
      >
        <Token>
          <Image
            alt=""
            height="352"
            src="/images/illustrations/nft/color-background.png"
            width="298"
          />
          <Image
            alt=""
            height="271"
            src="/images/illustrations/nft/nft.png"
            width="184"
          />
        </Token>
      </NonInteractiveWindow>
    </ForegroundWindow>
    <Sparkle
      height={5.4}
      left={11.4}
      strokeColor="trueWhite"
      top={17.1}
      width={5.2}
    />
    <Sparkle
      fillColor="trueWhite"
      height={14.3}
      left={49.1}
      strokeColor="vibrantBlue"
      top={34.4}
      width={14}
    />
  </Illustration>
)

export default Communities

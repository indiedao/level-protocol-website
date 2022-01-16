import styled from 'styled-components'
import Image from 'next/image'

import NonInteractiveWindow from '../../NonInteractiveWindow'
import Elevation from '../../Elevation'
import Sparkle from '../../Sparkle/Sparkle'
import NavbarSvg from './navbar.svg'
import ScrollBarSvg from './scrollbar.svg'

const Illustration = styled.div`
  position: relative;
  width: 83.1rem;
  height: 50.5rem;
  background: transparent ${props => props.theme.halftones.xs};
`

const Navbar = styled(NavbarSvg)`
  transform: translate(-0.1rem, -0.1rem);
`

const Scrollbar = styled(ScrollBarSvg)`
  position: absolute;
  top: 0;
  right: 0;
  background: ${props => props.theme.colors.vibrantCream}
    ${props => props.theme.halftones.md};
`

const Toolbar = styled.div`
  position: absolute;
  top: calc(3.2rem + 2.2rem);
  left: 2.4rem;
`

const Pyramid = styled(Elevation)`
  position: absolute;
  top: calc(3.3rem + 2.2rem);
  left: 37.2rem;
  width: 46.7rem;
  height: 35rem;
  overflow: hidden;
`

const Token = styled(Elevation)`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: calc(9.9rem + 2.2rem);
  left: 13.6rem;
  width: 29.8rem;
  height: 35.2rem;
  overflow: hidden;
  background-color: ${props => props.theme.colors.mutedBlack};

  > *:first-child {
    position: absolute !important;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
`

const NFT = () => (
  <NonInteractiveWindow
    caption="a retro OS window displays a retro version of the Level Protocol NFT"
    height={5.2 + 50.5 + 0.8}
    title="Design Pro 2000"
    width={83.9}
  >
    <Illustration>
      <Pyramid>
        <Image
          alt=""
          height="350"
          src="/images/illustrations/nft/pyramid.png"
          width="467"
        />
      </Pyramid>
      <Token>
        <Image
          alt=""
          height="352"
          src="/images/illustrations/nft/color-background.png"
          width="298"
        />
        <Image
          alt=""
          height="275"
          src="/images/illustrations/nft/nft.png"
          width="187"
        />
      </Token>
      <Toolbar>
        <Image
          alt=""
          height="196"
          src="/images/illustrations/nft/toolbar.png"
          width="100"
        />
      </Toolbar>
      <Navbar />
      <Scrollbar />
      <Sparkle
        fillColor="trueWhite"
        height={5.2}
        left={22.8}
        strokeColor="trueBlack"
        top={12.6 + 2.2}
        width={5.4}
      />
      <Sparkle
        fillColor="trueWhite"
        height={7.9}
        left={8.2}
        strokeColor="trueBlack"
        top={32.2 + 2.2}
        width={7.7}
      />
      <Sparkle
        fillColor="trueWhite"
        height={12.1}
        left={66.2}
        strokeColor="trueBlack"
        top={5.1 + 2.2}
        width={11.8}
      />
    </Illustration>
  </NonInteractiveWindow>
)

export default NFT

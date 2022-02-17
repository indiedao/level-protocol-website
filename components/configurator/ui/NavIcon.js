import styled from 'styled-components'
import PropTypes from 'prop-types'

import PfpSvg from '../assets/pfp.svg'
import ColorSvg from '../assets/color.svg'
import MintSvg from '../assets/mint.svg'
import SignSvg from '../assets/sign.svg'
import SaveSvg from '../assets/save.svg'
import GiveSvg from '../assets/give.svg'

const ICONS = {
  Pfp: PfpSvg,
  Color: ColorSvg,
  Mint: MintSvg,
  Sign: SignSvg,
  Save: SaveSvg,
  Give: GiveSvg,
}

export const ICON_NAMES = Object.keys(ICONS)

const StyledIcon = styled.div`
  --fill: ${({ isActive }) => (isActive ? '#fffcd8' : '#8f8d76')};

  width: 6.4rem;
  height: 9.3rem;
  transition: fill 144ms ease;

  > svg {
    width: inherit;
    height: inherit;
  }
`

const Icon = ({ iconName, isActive, ...props }) => {
  const IconSvg = ICONS[iconName]

  return (
    <StyledIcon isActive={isActive}>
      <IconSvg {...props} />
    </StyledIcon>
  )
}

Icon.propTypes = {
  iconName: PropTypes.oneOf(ICON_NAMES),
  isActive: PropTypes.bool,
}

Icon.defaultProps = {
  iconName: 'Pfp',
  isActive: true,
}

export default Icon

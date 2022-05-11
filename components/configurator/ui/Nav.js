import styled from 'styled-components'
import PropTypes from 'prop-types'

import { STEPS } from '../../contexts/ConfiguratorContext'
import NavIcon from './NavIcon'

const ScreenContent = styled.div`
  align-self: stretch;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content 1fr;
  grid-gap: clamp(0.8rem, 3vh, 1.2rem);
`

const StyledNav = styled.nav`
  align-self: end;
  justify-self: center;
  display: grid;
  align-items: end;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 2.4rem;
  max-height: clamp(3.2rem, 8vh, 9.3rem);
`

const Nav = ({ children, currentStep, flow, setStep }) => (
  <ScreenContent>
    <StyledNav>
      <NavIcon
        iconName="Pfp"
        isActive={currentStep === 'NFT'}
        onClick={() => setStep('NFT')}
      />
      <NavIcon
        iconName="Color"
        isActive={currentStep === 'COLOR'}
        onClick={() => setStep('COLOR')}
      />
      <NavIcon
        iconName={flow === 'CONFIG' ? 'Save' : 'Mint'}
        isActive={currentStep === 'SAVE'}
        onClick={() => setStep('SAVE')}
      />
    </StyledNav>
    {children}
  </ScreenContent>
)

Nav.propTypes = {
  children: PropTypes.node.isRequired,
  currentStep: PropTypes.oneOf(STEPS).isRequired,
  flow: PropTypes.string,
  setStep: PropTypes.func.isRequired,
}

Nav.defaultProps = {
  flow: 'CONFIG',
}

export default Nav

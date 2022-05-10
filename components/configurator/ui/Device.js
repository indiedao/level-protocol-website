import styled from 'styled-components'
import PropTypes from 'prop-types'

import ConfiguratorControls from './ConfiguratorControls'

const DeviceBox = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  max-width: 500px;
  max-height: 900px;
  display: grid;
  justify-items: center;
  grid-template-rows: 1fr min-content;
  grid-gap: 0.8rem;
  border-radius: 40px;
  background: ${props => props.theme.colors.vibrantCream};
  padding: 3.2rem 4rem 3.2rem 3.2rem;
  box-shadow: inset 0 0.4rem 0.4rem 0.1rem #d6d1be,
    inset 0 -2.4rem 1rem 0.8rem rgba(0, 0, 0, 0.25),
    inset 0 -2rem 3.2rem 2.4rem rgba(255, 255, 255, 0.25);

  @media (min-width: 376px) {
    grid-gap: 1.2rem;
  }

  @media (max-width: 421px) {
    grid-gap: 2.4rem;
  }
`

const Device = ({ children, ...controls }) => (
  <DeviceBox>
    {children}
    <ConfiguratorControls {...controls} />
  </DeviceBox>
)

Device.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Device

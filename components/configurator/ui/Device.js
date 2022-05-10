import styled from 'styled-components'
import PropTypes from 'prop-types'

import Controls from './Controls'

const DeviceBox = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  max-width: 500px;
  max-height: 900px;
  display: grid;
  justify-items: center;
  grid-template-rows: 1fr min-content;
  grid-gap: min(3vh, 2.4rem);
  border-radius: min(6.666vw, 4rem);
  background: ${props => props.theme.colors.vibrantCream};
  padding: 1.6rem 2rem 1.6rem 1.6rem;
  box-shadow: inset 0 min(0.666vw, 0.4rem) min(0.666vw, 0.4rem)
      min(0.166vw, 0.1rem) #d6d1be,
    inset 0 max(-4vw, -2.4rem) min(1.666vw, 1rem) min(1.333vw, 0.8rem)
      rgba(0, 0, 0, 0.25),
    inset 0 max(-3.333vw, -2rem) min(4.666vw, 3.2rem) min(4vw, 2.4rem)
      rgba(255, 255, 255, 0.25);

  @media (min-width: 320px) {
    padding: 3.2rem 4rem 3.2rem 3.2rem;
  }
`

const Device = ({ children, ...controls }) => (
  <DeviceBox>
    {children}
    <Controls {...controls} />
  </DeviceBox>
)

Device.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Device

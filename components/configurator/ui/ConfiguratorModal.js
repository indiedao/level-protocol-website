import styled from 'styled-components'

const StyledModal = styled.div`
  z-index: 10;
  position: absolute;
  top: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
`

const ConfiguratorModal = ({ children }) => {
  return <StyledModal>{children}</StyledModal>
}

export default ConfiguratorModal

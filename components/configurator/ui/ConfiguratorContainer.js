import styled from 'styled-components'

const ConfiguratorContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  max-width: 500px;
  max-height: 900px;
  display: grid;
  justify-items: center;
  grid-template-rows: 1fr 26rem;
  grid-gap: 2.4rem;
  border-radius: 40px;
  background: ${props => props.theme.colors.vibrantCream};
  padding: 3.2rem 4rem 3.2rem 3.2rem;
  box-shadow: inset 0px 4px 4px 1px #d6d1be,
    inset 0px -24px 10px 8px rgba(0, 0, 0, 0.25),
    inset 0px -20px 32px 24px rgba(255, 255, 255, 0.25);

  @media (max-width: 375px) {
    grid-gap: 0.8rem;
  }

  @media (max-width: 420px) {
    grid-gap: 1.2rem;
  }
`

export default ConfiguratorContainer

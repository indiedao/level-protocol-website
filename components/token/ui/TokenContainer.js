import styled, { css } from 'styled-components'

const TokenContainer = styled.div`
  ${props => css`
    position: relative;
    display: grid;
    width: ${props.width}px;
    height: ${props.height}px;
    grid-template-rows: 20% 68% 12%;
    justify-items: center;
    overflow: hidden;
    padding: 25px 38px 11px;

    ${({ theme }) => theme.bp.xs`
      padding: 25px 10px 10px;
      grid-template-rows: 20% 55% 60px;
    `}

    ${({ theme }) => theme.bp.sm`
      padding: 25px 10px 10px;
      grid-template-rows: 20% 48% 60px;

      canvas {
        margin-top: 5vh;
      }
    `}

    ${({ theme }) => theme.bp.md`
      grid-template-rows: 144px 54% 12%;
    `}
  `}
`

export default TokenContainer

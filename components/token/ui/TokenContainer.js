import styled, { css } from 'styled-components'

const TokenContainer = styled.div`
  ${props => css`
    display: grid;
    width: ${props.width}px;
    height: ${props.height}px;
    grid-template-rows: 20% 20px auto;
    background-color: pink;
    justify-items: center;
  `}
`

export default TokenContainer

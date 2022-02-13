import styled, { css } from 'styled-components'

const NFTImage = styled.img`
  ${props => css`
    width: 100px;
    height: 100px;
    cursor: ${props.theme.cursors.select};

    ${props.selected &&
    css`
      border: 4px solid red;
    `}
  `}
`

export default NFTImage

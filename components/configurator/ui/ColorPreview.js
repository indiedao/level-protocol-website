import styled from 'styled-components'

const ColorPreview = styled.div`
  width: 200px;
  height: 200px;
  background-color: ${({ hue, lightness }) =>
    `hsl(${hue}, 100%, ${lightness}%)`};
`

export default ColorPreview

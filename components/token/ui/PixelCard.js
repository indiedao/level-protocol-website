import styled, { css } from 'styled-components'

// Construct a corner using a grid and css/div "Pixels":
const Corner = ({ corner, color }) => (
  <CornerGrid corner={corner}>
    <div />
    <div />
    <div />
    <div />
    <div />
    <Pixel color={color} />
    <div />
    <Pixel color={color} />
    <div />
  </CornerGrid>
)

const PixelCard = ({ children, color }) => (
  <OuterGrid>
    <Corner corner={1} color={color} />
    <Border side="top" color={color} />
    <Corner corner={2} color={color} />
    <Border side="left" color={color} />
    <div>{children}</div>
    <Border side="right" color={color} />
    <Corner corner={3} color={color} />
    <Border side="bottom" color={color} />
    <Corner corner={4} color={color} />
  </OuterGrid>
)

const OuterGrid = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 12px auto 12px;
  grid-template-rows: 12px auto 12px;
`

const CornerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);

  ${({ corner }) =>
    corner === 2 &&
    css`
      transform: scale(-1, 1);
    `}

  ${({ corner }) =>
    corner === 3 &&
    css`
      transform: scale(1, -1);
    `}

  ${({ corner }) =>
    corner === 4 &&
    css`
      transform: scale(-1, -1);
    `}
`

const Pixel = styled.div`
  background-color: ${({ color }) => color};
`
const Border = styled.div`
  ${props => css`
    border-${props.side}: 4px solid ${props.color};
  `}
`

export default PixelCard

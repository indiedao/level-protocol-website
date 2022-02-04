import styled, { css } from 'styled-components'
import {
  busyPointerUrl,
  defaultPointerUrl,
  selectPointerUrl,
} from '../util/theme'
import SectionTitle from './SectionTitle'
import StoryGrid from './StoryGrid'

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`

const Cursor = styled.div`
  ${({ cursor, image }) => css`
    position: relative;
    height: 7rem;
    width: 7rem;
    background: ${image} no-repeat;
    cursor: ${props => props.theme.cursors[cursor]};
  `}
`

export const Pointers = () => (
  <StoryGrid columns={1}>
    <SectionTitle>Variants</SectionTitle>
    <Container>
      <Cursor cursor="default" image={defaultPointerUrl} />
      <Cursor cursor="select" image={selectPointerUrl} />
      <Cursor cursor="busy" image={busyPointerUrl} />
    </Container>
  </StoryGrid>
)

const Story = {
  title: 'Design System / Pointers',
}

export default Story

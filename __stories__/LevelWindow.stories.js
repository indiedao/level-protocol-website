import styled from 'styled-components'
import { LevelWindow } from '../components/ui/LevelWindow'
import StoryGrid from './StoryGrid'

const LongContent = styled.div`
  height: 900px;
`

export const Window = ({ title, scrollbars }) => (
  <StoryGrid columns={1}>
    <LevelWindow title={title} open>
      {scrollbars && <LongContent />}
    </LevelWindow>
  </StoryGrid>
)

Window.args = {
  title: 'Level Protocol',
  scrollbars: false,
}

const Story = {
  title: 'Design System / Window',
  control: {
    type: 'checkbox',
  },
}

export default Story

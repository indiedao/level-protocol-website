import styled from 'styled-components'
import { Window as WindowUI } from '../components/ui/Window'
import StoryGrid from './StoryGrid'

const LongContent = styled.div`
  height: 900px;
`

export const Window = ({ title, scrollbars }) => (
  <StoryGrid columns={1}>
    <WindowUI title={title} open>
      {scrollbars && <LongContent />}
    </WindowUI>
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

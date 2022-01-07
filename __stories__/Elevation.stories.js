import styled from 'styled-components'
import StoryGrid from './StoryGrid'

import ElevationUI from '../components/ui/Elevation'

const Card = styled(ElevationUI)`
  display: flex;
  width: 12rem;
  align-items: flex-end;
  padding: 2rem;
  font-size: 2rem;
  height: 17.5rem;
  font-family: ${({ theme }) => theme.fontStacks.chicago};
`

const Template = ({ Elevation: elevation }) => (
  <StoryGrid columns={2}>
    <Card elevation={elevation}>{elevation}pt</Card>
  </StoryGrid>
)

export const Elevation = Template.bind({})
Elevation.args = {
  Elevation: '12',
}

const Story = {
  title: 'Design System / Elevation',
  argTypes: {
    Elevation: {
      options: ['12', '16'],
      control: {
        type: 'select',
      },
    },
  },
}

export default Story

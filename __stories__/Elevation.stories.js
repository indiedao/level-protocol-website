import styled from 'styled-components'
import StoryGrid from './StoryGrid'

import ElevationUI from '../components/ui/Elevation'
import { H3 } from '../components/ui/Typography'

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
    <H3>Fuctional</H3>
    <H3>Static</H3>
    <Card elevation={elevation}>{elevation}pt</Card>
    <StoryGrid style={{ padding: 0 }}>
      <Card elevation="12">12pt</Card>
      <Card elevation="16">16pt</Card>
    </StoryGrid>
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

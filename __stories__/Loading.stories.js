import React from 'react'
import StoryGrid from './StoryGrid'
import LoadingUI from '../components/ui/Loading'

const Template = () => (
  <StoryGrid columns={2}>
    <LoadingUI />
  </StoryGrid>
)

export const Loading = Template.bind({})

const Story = {
  title: 'Design System / Loading',
  component: LoadingUI,
}

export default Story

import React from 'react'
import styled from 'styled-components'
import StoryGrid from './StoryGrid'
import LoadingUI from '../components/ui/Loading'

const LoadingExample = styled.div`
  display: flex;
  justify-content: center;
  padding: 32px;
  background-color: #302f2c;
`

const Template = () => (
  <StoryGrid columns={2}>
    <LoadingExample>
      <LoadingUI />
    </LoadingExample>
  </StoryGrid>
)

export const Loading = Template.bind({})

const Story = {
  title: 'Design System / Loading',
  component: LoadingUI,
}

export default Story

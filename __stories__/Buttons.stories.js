import React from 'react'

import StoryGrid from './StoryGrid'

import { TextButton, Button, RetroButton } from '../components/ui/Buttons'

export const All = () => (
  <StoryGrid columns={6}>
    <div>
      <TextButton>Text Button</TextButton>
    </div>
    <div>
      <Button>Button</Button>
    </div>
    <div>
      <Button isDisabled>Disabled Button</Button>
    </div>

  </StoryGrid>
)

export const Retro = () => (
  <StoryGrid columns={4}>
    <div>
      <RetroButton>Retro Button</RetroButton>
    </div>
  </StoryGrid>
)

export const Retro = () => (
  <StoryGrid columns={4}>
    <div>
      <RetroButton>Retro Button</RetroButton>
    </div>
  </StoryGrid>
)

const Story = {
  title: 'Buttons',
}

export default Story

import React from 'react'

import StoryGrid from './StoryGrid'

import { TextButton, Button } from '../components/ui/Buttons'

export const All = () => (
  <StoryGrid columns={6}>
    <div>
      <TextButton>Text Button</TextButton>
    </div>
    <div>
      <Button>Button</Button>
    </div>
    <div>
      <Button isDisabled={true}>Disabled Button</Button>
    </div>
  </StoryGrid>
)

export default {
  title: 'Buttons',
}

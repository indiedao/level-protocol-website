import React from 'react'
import styled from 'styled-components'

import Button from '../components/ui/Buttons'
import { Body1, H3 } from '../components/ui/Typography'
import StoryGrid from './StoryGrid'

const StateExample = styled.div`
  justify-self: start;
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
`

const Template = ({ 'Button Text': children }) => (
  <StoryGrid columns={2}>
    <H3>Functional</H3>
    <H3>Static States</H3>
    <Button>{children}</Button>
    <StoryGrid style={{ padding: 0 }}>
      <StateExample>
        <Button stateOverride="resting" disabled>
          {children}
        </Button>
        <Body1>Resting</Body1>
      </StateExample>
      <StateExample>
        <Button stateOverride="hover" disabled>
          {children}
        </Button>
        <Body1>Hover</Body1>
      </StateExample>
      <StateExample>
        <Button stateOverride="active" disabled>
          {children}
        </Button>
        <Body1>Active</Body1>
      </StateExample>
    </StoryGrid>
  </StoryGrid>
)

export const Buttons = Template.bind({})
Buttons.args = {
  'Button Text': 'Button Text',
}

const Story = {
  title: 'Design System / Buttons',
}

export default Story

import React from 'react'
import styled from 'styled-components'

import Button from '../components/ui/Button'
import { Body1, H2, H3, body1Styles } from '../components/ui/Typography'
import StoryGrid from './StoryGrid'

const SectionTitle = styled(H2)`
  grid-column: 1 / span 2;
`

const ExampleSection = styled(StoryGrid)`
  align-self: start;
  grid-gap: 3rem;
  padding: 0;
`

const StateExample = styled.div`
  ${body1Styles}
  justify-self: start;
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  grid-gap: 1.5rem;
`

const Template = ({ buttonText: children }) => (
  <StoryGrid columns={2}>
    <SectionTitle>Button</SectionTitle>
    <ExampleSection>
      <H3>Functional</H3>
      <Button>{children}</Button>
    </ExampleSection>
    <ExampleSection>
      <H3>Static States</H3>
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
    </ExampleSection>
  </StoryGrid>
)

export const Buttons = Template.bind({})
Buttons.args = {
  buttonText: 'Button Text',
  argTypes: {
    linkText: {
      description: 'Provide the text to use for the button.',
      table: {
        defaultValue: {
          summary: 'Button Text',
        },
      },
    },
  },
}

const Story = {
  title: 'Design System / Buttons',
}

export default Story

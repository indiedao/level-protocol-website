import React from 'react'
import styled from 'styled-components'

import { COLOR_NAMES } from '../util/theme'
import ButtonUI from '../components/ui/Button'
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

const Template = ({ children, color, disabled }) => (
  <StoryGrid columns={2}>
    <SectionTitle>Button</SectionTitle>
    <ExampleSection>
      <H3>Functional</H3>
      <ButtonUI color={color} disabled={disabled}>
        {children}
      </ButtonUI>
    </ExampleSection>
    <ExampleSection>
      <H3>Static States</H3>
      <StateExample>
        <ButtonUI state="resting" disabled>
          {children}
        </ButtonUI>
        <Body1>Resting</Body1>
      </StateExample>
      <StateExample>
        <ButtonUI state="hover" disabled>
          {children}
        </ButtonUI>
        <Body1>Hover</Body1>
      </StateExample>
      <StateExample>
        <ButtonUI state="active" disabled>
          {children}
        </ButtonUI>
        <Body1>Active</Body1>
      </StateExample>
    </ExampleSection>
  </StoryGrid>
)

export const Button = Template.bind({})
Button.args = {
  children: 'Button Text',
  color: 'trueWhite',
  disabled: false,
}

const Story = {
  title: 'Design System / Button',
  component: ButtonUI,
  argTypes: {
    children: {
      description: 'Provide the text to use for the button.',
      table: {
        defaultValue: {
          summary: 'Button Text',
        },
      },
    },
    color: {
      description: 'The color for the button text.',
      table: {
        defaultValue: {
          summary: 'trueWhite',
        },
      },
      options: COLOR_NAMES,
      control: {
        type: 'select',
      },
    },
    onClick: {
      table: {
        disable: true,
      },
    },
    state: {
      table: {
        disable: true,
      },
    },
  },
}

export default Story

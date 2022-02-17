import styled from 'styled-components'

import ButtonUI, { VARIANTS } from './Button'
import { Body1, H2, H3, body1Styles } from '../../ui/Typography'
import StoryGrid from '../../../__stories__/StoryGrid'

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
  justify-items: center;
  align-items: start;
  grid-template-columns: 1fr;
  grid-template-rows: min-content 1fr;
  grid-gap: 1.5rem;
`

const StateDescription = styled(Body1)`
  text-align: center;
`

const Template = ({ disabled, text, variant }) => (
  <StoryGrid columns={2}>
    <SectionTitle>Button</SectionTitle>
    <ExampleSection>
      <H3>Functional</H3>
      <ButtonUI disabled={disabled} text={text} variant={variant} />
    </ExampleSection>
    <ExampleSection>
      <H3>Static States</H3>
      <StoryGrid columns={2}>
        <StateExample>
          <ButtonUI disabled state="resting" text="hi" variant={variant} />
          <StateDescription>Resting</StateDescription>
        </StateExample>
        <StateExample>
          <ButtonUI
            disabled
            state="resting-disabled"
            text="hi"
            variant={variant}
          />
          <StateDescription>Resting (disabled)</StateDescription>
        </StateExample>
        <StateExample>
          <ButtonUI disabled state="hover" text="hi" variant={variant} />
          <StateDescription>Hover</StateDescription>
        </StateExample>
        <StateExample>
          <ButtonUI
            disabled
            state="hover-disabled"
            text="hi"
            variant={variant}
          />
          <StateDescription>Hover (disabled)</StateDescription>
        </StateExample>
        <StateExample>
          <ButtonUI disabled state="active" text="hi" variant={variant} />
          <StateDescription>Active</StateDescription>
        </StateExample>
        <StateExample>
          <ButtonUI
            disabled
            state="active-disabled"
            text="hi"
            variant={variant}
          />
          <StateDescription>Active (disabled)</StateDescription>
        </StateExample>
      </StoryGrid>
    </ExampleSection>
  </StoryGrid>
)

export const Button = Template.bind({})
Button.args = {
  text: 'A',
  variant: 'a',
  disabled: false,
}

const Story = {
  title: 'Configurator / Button',
  component: ButtonUI,
  argTypes: {
    children: {
      description:
        'Provide the text to use for the button; this text is available to screen readers only.',
      table: {
        defaultValue: {
          summary: 'Button Text',
        },
      },
    },
    variant: {
      description: 'The button variant.',
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
      options: VARIANTS,
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

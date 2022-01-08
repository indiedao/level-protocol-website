import React, { Fragment } from 'react'
import styled from 'styled-components'

import Link from '../components/ui/Link'
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
`

const hrefExamples = {
  Internal: '/',
  External: 'https://level.2c.io/',
}

const hrefExampleNames = Object.keys(hrefExamples)

const Template = ({ linkText: children }) => (
  <StoryGrid columns={2}>
    {hrefExampleNames.map(hrefExampleName => (
      <Fragment key={hrefExampleName}>
        <SectionTitle color="mutedCream">{hrefExampleName}</SectionTitle>
        <ExampleSection>
          <H3 color="mutedCream">Functional</H3>
          <Link href="/">{children}</Link>
          <Body1>Set your background to `dark` to see the states.</Body1>
        </ExampleSection>
        <ExampleSection>
          <H3 color="mutedCream">Static States</H3>
          <StateExample>
            <Link href="/" stateOverride="resting">
              {children}
            </Link>
            <Body1>Resting</Body1>
          </StateExample>
          <StateExample>
            <Link href="/" stateOverride="hover">
              {children}
            </Link>
            <Body1>Hover</Body1>
          </StateExample>
          <StateExample>
            <Link href="/" stateOverride="active">
              {children}
            </Link>
            <Body1>Active</Body1>
          </StateExample>
        </ExampleSection>
      </Fragment>
    ))}
  </StoryGrid>
)

export const Links = Template.bind({})
Links.args = {
  linkText: 'Link Text',
}

const Story = {
  title: 'Design System / Links',
  argTypes: {
    linkText: {
      description: 'Provide the text to use for the link.',
      table: {
        defaultValue: {
          summary: 'Link Text',
        },
      },
    },
  },
}

export default Story

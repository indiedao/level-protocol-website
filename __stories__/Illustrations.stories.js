import React from 'react'
import styled from 'styled-components'

import small, {
  SMALL_ILLUSTRATION_NAMES,
} from '../components/ui/illustrations/small'
import large, {
  LARGE_ILLUSTRATION_NAMES,
} from '../components/ui/illustrations/large'
import { Body1 } from '../components/ui/Typography'
import SectionTitle from './SectionTitle'
import StoryGrid from './StoryGrid'

const Example = styled.div`
  justify-self: start;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 2rem;
  justify-items: center;
`

const Template = () => (
  <>
    <StoryGrid columns={5}>
      <SectionTitle>Small Illustrations</SectionTitle>
      {SMALL_ILLUSTRATION_NAMES.map(illustrationName => {
        const Illustration = small[illustrationName]
        return (
          <Example key={illustrationName}>
            <Illustration />
            <Body1>{illustrationName}</Body1>
          </Example>
        )
      })}
    </StoryGrid>
    <StoryGrid columns={1}>
      <SectionTitle columns={1}>Large Illustrations</SectionTitle>
      {LARGE_ILLUSTRATION_NAMES.map(illustrationName => {
        const Illustration = large[illustrationName]
        return (
          <Example key={illustrationName}>
            <Illustration />
            <Body1>{illustrationName}</Body1>
          </Example>
        )
      })}
    </StoryGrid>
  </>
)

export const Illustrations = Template.bind({})

const Story = {
  title: 'Marketing / Illustrations',
}

export default Story

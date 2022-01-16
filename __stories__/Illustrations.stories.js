import React from 'react'
import styled from 'styled-components'

import illustrations from '../components/ui/illustrations'
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
  <StoryGrid columns={5}>
    <SectionTitle>Small Illustrations</SectionTitle>
    {Object.keys(illustrations).map(illustrationName => {
      const Illustration = illustrations[illustrationName]
      return (
        <Example key={illustrationName}>
          <Illustration />
          <Body1>{illustrationName}</Body1>
        </Example>
      )
    })}
  </StoryGrid>
)

export const Small = Template.bind({})

const Story = {
  title: 'Marketing / Illustrations',
}

export default Story

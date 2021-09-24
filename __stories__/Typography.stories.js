import React from 'react'

import StoryGrid from './StoryGrid'

import {
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Body1,
  Body2,
  Caption,
  Overline1,
  Overline2,
  Hyperlink,
  Code,
  InlineCode,
} from '../components/ui/Typography'

export const All = () => (
  <StoryGrid>
    <div>
      <H1>Header 1</H1>
    </div>
    <div>
      <H2>Header 2</H2>
    </div>
    <div>
      <H3>Header 3</H3>
    </div>
    <div>
      <H4>Header 4</H4>
    </div>
    <div>
      <H5>Header 5</H5>
    </div>
    <div>
      <H6>Header 6</H6>
    </div>
    <div>
      <Body1>Body 1</Body1>
    </div>
    <div>
      <Body2>Body 2</Body2>
    </div>
    <div>
      <Caption>Caption</Caption>
    </div>
    <div>
      <Overline1>Overline 1</Overline1>
    </div>
    <div>
      <Overline2>Overline 2</Overline2>
    </div>
    <div>
      <Hyperlink href="#">Hyperlink</Hyperlink>
    </div>
    <div>
      <Code>Code</Code>
    </div>
    <div>
      <InlineCode>Inline Code</InlineCode>
    </div>
  </StoryGrid>
)

export default {
  title: 'Typography',
}

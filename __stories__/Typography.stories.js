import React from 'react'
import Link from 'next/link'

import {
  H1,
  H2,
  H3,
  H4,
  Body1,
  Body2,
  StyledLinkText,
} from '../components/ui/Typography'
import Button from '../components/ui/Buttons'
import StoryGrid from './StoryGrid'

const linkContainers = {
  H1,
  H2,
  H3,
  H4,
  Body1,
  Body2,
}

const Template = ({ 'Element Containing Link': linkContainerName }) => {
  const LinkContainer = linkContainers[linkContainerName]
  return (
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
        <Body1>Body 1</Body1>
      </div>
      <div>
        <Body2>Body 2</Body2>
      </div>
      <div>
        <Button>
          Button Text
        </Button>
      </div>
      <LinkContainer>
        <Link href="/#" passHref>
          <StyledLinkText>Link Text</StyledLinkText>
        </Link>
      </LinkContainer>
    </StoryGrid>
  )
}

export const Typography = Template.bind({})
Typography.args = {
  'Element Containing Link': 'Body1',
}

const Story = {
  title: 'Design System / Typography',
  argTypes: {
    'Element Containing Link': {
      options: Object.keys(linkContainers),
      control: {
        type: 'select',
      },
    },
  },
}

export default Story

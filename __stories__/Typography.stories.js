import React from 'react'
import Link from 'next/link'

import StoryGrid from './StoryGrid'

import {
  H1,
  H2,
  H3,
  H4,
  Body1,
  Body2,
  StyledButton,
  StyledLink,
} from '../components/ui/Typography'

const linkContainers = {
  H1,
  H2,
  H3,
  H4,
  Body1,
  Body2,
}

const Template = ({ linkContainerName }) => {
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
        <StyledButton
          style={{ backgroundColor: '#4a4a4a', borderColor: '#4a4a4a' }}
        >
          Button Text
        </StyledButton>
      </div>
      <LinkContainer>
        <Link href="/#" passHref>
          <StyledLink>Link Text</StyledLink>
        </Link>
      </LinkContainer>
    </StoryGrid>
  )
}

export const Typography = Template.bind({})
Typography.args = {
  linkContainerName: 'Body1',
}

const Story = {
  title: 'Design System / Typography',
  argTypes: {
    linkContainerName: {
      options: Object.keys(linkContainers),
      control: {
        type: 'select',
      },
    },
  },
}

export default Story

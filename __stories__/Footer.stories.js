import React from 'react'

import FooterUI from '../components/ui/Footer'
import StoryGrid from './StoryGrid'
import theme from '../util/theme'

const trueColors = Object.keys(theme.colors).filter(colorName =>
  /^true/.test(colorName),
)

const vibrantColors = Object.keys(theme.colors).filter(colorName =>
  /^vibrant/.test(colorName),
)

const mutedColors = Object.keys(theme.colors).filter(colorName =>
  /^muted/.test(colorName),
)

const Template = ({ 'Background Color': backgroundColor }) => (
  <StoryGrid columns={1}>
    <FooterUI backgroundColor={theme.colors[backgroundColor]} />
  </StoryGrid>
)

export const Footer = Template.bind({})
Footer.args = {
  'Background Color': `${theme.colors.vibrantBlack}`,
}

const Story = {
  title: 'Design System / Footer',
  argTypes: {
    'Background Color': {
      options: [
        ...trueColors,
        ...vibrantColors,
        ...mutedColors,
        'black',
        'white',
      ],
      control: {
        type: 'select',
      },
    },
  },
}

export default Story

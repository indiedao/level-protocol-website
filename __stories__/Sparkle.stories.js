import SparkleUI from '../components/ui/Sparkle/Sparkle'

import { COLOR_NAMES } from '../util/theme'

const Template = ({ fillColor, height, strokeColor, width }) => (
  <SparkleUI
    fillColor={fillColor}
    height={height}
    strokeColor={strokeColor}
    width={width}
  />
)

export const Sparkle = Template.bind({})
Sparkle.args = {
  strokeColor: 'white',
  fillColor: 'transparent',
  width: 14.8,
  height: 15.1,
}

const Story = {
  title: 'Design System / Sparkle',
  component: SparkleUI,
  argTypes: {
    strokeColor: {
      options: COLOR_NAMES,
      control: {
        type: 'select',
      },
    },
    fillColor: {
      options: ['transparent', ...COLOR_NAMES],
      control: {
        type: 'select',
      },
    },
    width: {
      description: 'The width of the sparkle.',
      table: {
        type: {
          summary: '(in 10px rem)',
        },
        defaultValue: {
          summary: 14.8,
        },
      },
      control: {
        type: 'range',
        max: 50,
        min: 0.1,
        step: 0.1,
      },
    },
    height: {
      description: 'The height of the sparkle.',
      table: {
        type: {
          summary: '(in 10px rem)',
        },
        defaultValue: {
          summary: 15.1,
        },
      },
      control: {
        type: 'range',
        max: 50,
        min: 0.1,
        step: 0.1,
      },
    },
  },
}

export default Story

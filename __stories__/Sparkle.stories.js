import SparkleUI from '../components/ui/Sparkle/Sparkle'

import { COLOR_NAMES } from '../util/theme'

const Template = ({ fillColor, height, left, strokeColor, top, width }) => (
  <SparkleUI
    fillColor={fillColor}
    height={height}
    left={left}
    strokeColor={strokeColor}
    top={top}
    width={width}
  />
)

export const Sparkle = Template.bind({})
Sparkle.args = {
  strokeColor: 'white',
  fillColor: 'transparent',
  width: 14.8,
  height: 15.1,
  top: undefined,
  left: undefined,
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
    top: {
      description: 'Optional top positioning',
      table: {
        type: {
          summary: '(in 10px rem)',
        },
        defaultValue: {
          summary: 'undefined',
        },
      },
    },
    left: {
      description: 'Optional left positioning',
      table: {
        type: {
          summary: '(in 10px rem)',
        },
        defaultValue: {
          summary: 'undefined',
        },
      },
    },
  },
}

export default Story

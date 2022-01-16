import { COLOR_NAMES } from '../util/theme'
import NonInteractiveWindowUI from '../components/ui/NonInteractiveWindow'

const Template = ({
  children,
  contentBackgroundColor,
  height,
  title,
  titleBarBackgroundColor,
  width,
}) => (
  <NonInteractiveWindowUI
    contentBackgroundColor={contentBackgroundColor}
    height={height}
    title={title}
    titleBarBackgroundColor={titleBarBackgroundColor}
    width={width}
  >
    {children}
  </NonInteractiveWindowUI>
)

export const NonInteractiveWindow = Template.bind({})

NonInteractiveWindow.args = {
  children: 'Content appears here.',
  title: 'Skillz',
  titleBarBackgroundColor: 'vibrantBlue',
  contentBackgroundColor: 'vibrantCream',
  width: 50,
  height: 50,
}

const Story = {
  title: 'Design System / Non Interactive Window',
  component: NonInteractiveWindowUI,
  argTypes: {
    titleBarBackgroundColor: {
      description: 'The color of the title bar background.',
      table: {
        defaultValue: {
          summary: 'vibrantBlue',
        },
      },
      control: {
        options: COLOR_NAMES,
        type: 'select',
      },
    },
    contentBackgroundColor: {
      description: 'The color of the content background.',
      table: {
        defaultValue: {
          summary: 'vibrantCream',
        },
      },
      control: {
        options: COLOR_NAMES,
        type: 'select',
      },
    },
    width: {
      description: 'The width of the window.',
      table: {
        type: {
          summary: '(in 10px rem)',
        },
        defaultValue: {
          summary: 50,
        },
      },
      control: {
        type: 'range',
        min: 1,
        max: 100,
        step: 0.1,
      },
    },
    height: {
      description: 'The height of the window.',
      table: {
        type: {
          summary: '(in 10px rem)',
        },
        defaultValue: {
          summary: 50,
        },
      },
      control: {
        type: 'range',
        min: 1,
        max: 100,
        step: 0.1,
      },
    },
  },
}

export default Story

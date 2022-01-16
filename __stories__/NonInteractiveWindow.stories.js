import { COLOR_NAMES } from '../util/theme'
import NonInteractiveWindowUI, {
  OVERFLOWS,
} from '../components/ui/NonInteractiveWindow'

const Template = ({
  caption,
  children,
  contentBackgroundColor,
  height,
  title,
  titleBarBackgroundColor,
  width,
}) => (
  <NonInteractiveWindowUI
    caption={caption}
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
  caption: 'description',
  title: 'Skillz',
  titleBarBackgroundColor: 'vibrantBlue',
  contentBackgroundColor: 'vibrantCream',
  width: 50,
  height: 50,
  overflow: 'hidden',
}

const Story = {
  title: 'Design System / Non Interactive Window',
  component: NonInteractiveWindowUI,
  argTypes: {
    caption: {
      description: 'A description of the content for screen readers.',
    },
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
    overflow: {
      description:
        'Allow the content in the window to overflow the content bounds.',
      control: {
        options: OVERFLOWS,
        type: 'select',
      },
    },
  },
}

export default Story

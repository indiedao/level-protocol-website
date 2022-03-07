import NavIconUI, { ICON_NAMES } from './NavIcon'
import { H2 } from '../../ui/Typography'
import StoryGrid from '../../../__stories__/StoryGrid'

const Template = ({ isActive, iconName }) => (
  <StoryGrid columns={1}>
    <H2>NavIcon</H2>
    <NavIconUI iconName={iconName} isActive={isActive} />
  </StoryGrid>
)

export const NavIcon = Template.bind({})
NavIcon.args = {
  iconName: 'Pfp',
  isActive: true,
}

const Story = {
  title: 'Configurator / Nav Icon',
  component: NavIconUI,
  argTypes: {
    iconName: {
      description: 'The nav icon icon.',
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
      options: ICON_NAMES,
      control: {
        type: 'select',
      },
    },
  },
}

export default Story

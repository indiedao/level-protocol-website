import PanelUI from '../components/ui/Panel'
import Button from '../components/ui/Button'
import { SMALL_ILLUSTRATION_NAMES } from '../components/ui/illustrations/small'

const Template = ({ smallIllustrationName, title, buttonText }) => (
  <PanelUI
    button={buttonText ? <Button>{buttonText}</Button> : undefined}
    smallIllustrationName={smallIllustrationName}
    title={title}
  >
    <ol>
      <li>Define skills relevant for your community that members can earn</li>
      <li>Combine existing tools with your own community data</li>
      <li>
        Rollup all off-chain data from your community, DAO, game, or metaverse
        into members’ Level tokens, on-chain
      </li>
    </ol>
  </PanelUI>
)

export const Panel = Template.bind({})
Panel.args = {
  children: `
    <ol>
      <li>Define skills relevant for your community that members can earn</li>
      <li>Combine existing tools with your own community data</li>
      <li>
        Rollup all off-chain data from your community, DAO, game, or metaverse
        into members’ Level tokens, on-chain
      </li>
    </ol>
  `,
  smallIllustrationName: 'Community',
  title: 'For communities',
  buttonText: 'Join waitlist',
}

const Story = {
  title: 'Design System / Panel',
  component: PanelUI,
  argTypes: {
    smallIllustrationName: {
      options: SMALL_ILLUSTRATION_NAMES,
      description: 'The small illustration to use in the panel.',
      control: {
        type: 'select',
      },
    },
    buttonText: {
      description: 'The text to use for the button.',
    },
    button: {
      table: {
        disable: true,
      },
    },
  },
}

export default Story

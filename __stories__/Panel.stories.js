import PanelUI from '../components/ui/Panel'
import StoryGrid from './StoryGrid'
import Button from '../components/ui/Button'
import illustrations from '../components/ui/illustrations'

const Template = ({
  'Illustration Name': illustrationName,
  Title: title,
  Button: button,
}) => {
  const Illustration = illustrations[illustrationName]

  return (
    <StoryGrid columns={2}>
      <PanelUI title={title} illustration={<Illustration />}>
        <ol>
          <li>
            Define skills relevant for your community that members can earn
          </li>
          <li>Combine existing tools with your own community data</li>
          <li>
            Rollup all off-chain data from your community, DAO, game, or
            metaverse into members’ Level tokens, on-chain
          </li>
        </ol>
        <Button>{button}</Button>
      </PanelUI>
    </StoryGrid>
  )
}

export const Panel = Template.bind({})

Panel.args = {
  'Illustration Name': 'Community',
  Title: 'For communities',
  Button: 'Join waitlist',
}

const Story = {
  title: 'Design System / Panel',
  argTypes: {
    'Illustration Name': {
      options: [...Object.keys(illustrations)],
      control: {
        type: 'select',
      },
    },
  },
}

export default Story

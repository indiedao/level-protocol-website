import styled from 'styled-components'

import LevelWindowUI from '../components/ui/LevelWindow'

const ShortContent = styled.div`
  height: 50vh;
`

const LongContent = styled.div`
  height: 150vh;
`

const Template = ({
  'Buttons Enabled': enableActions,
  'Tall Content': scrollbars,
  Title,
}) => (
  <LevelWindowUI enableActions={enableActions} title={Title}>
    {scrollbars ? <LongContent /> : <ShortContent />}
  </LevelWindowUI>
)

export const LevelWindow = Template.bind({})

LevelWindow.args = {
  Title: 'Level Protocol',
  'Tall Content': false,
  'Buttons Enabled': true,
}

const Story = {
  title: 'Design System / Level Window',
  control: {
    type: 'checkbox',
  },
}

export default Story

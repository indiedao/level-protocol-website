import styled from 'styled-components'

import NonInteractiveWindowUI from '../components/ui/NonInteractiveWindow'

const ShortContent = styled.div`
  height: 50vh;
`

const LongContent = styled.div`
  height: 150vh;
`

const Template = ({
  'Tall Content': scrollbars,
  Title,
  'Title Bar Background Color': titleBarBackgroundColor,
  'Content Background Color': contentBackgroundColor,
}) => (
  <NonInteractiveWindowUI
    title={Title}
    titleBarBackgroundColor={titleBarBackgroundColor}
    contentBackgroundColor={contentBackgroundColor}
  >
    {scrollbars ? <LongContent /> : <ShortContent />}
  </NonInteractiveWindowUI>
)

export const NonInteractiveWindow = Template.bind({})

NonInteractiveWindow.args = {
  Title: 'Skillz',
  'Tall Content': false,
  'Title Bar Background Color': 'vibrantBlue',
  'Content Background Color': 'vibrantCream',
}

const Story = {
  title: 'Design System / Non Interactive Window',
  control: {
    type: 'checkbox',
  },
}

export default Story

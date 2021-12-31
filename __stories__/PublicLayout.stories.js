import styled from 'styled-components'

import PublicLayout from '../components/layouts/Public'

const Header = styled.h1`
  font-family: ChicagoFLFRegular;
  font-size: 6.4rem;
  line-height: 8.173rem;
`

const Template = ({ 'Header Text': headerText }) => (
  <PublicLayout>
    <Header>{headerText}</Header>
  </PublicLayout>
)

export const Public = Template.bind({})
Public.args = {
  'Header Text': 'Hello World!',
}

const Story = {
  title: 'Design System / Layouts / Public',
}

export default Story

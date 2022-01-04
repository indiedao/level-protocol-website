import styled from 'styled-components'

import HeroUI from '../components/ui/Hero'

const Container = styled.div`
  min-height: 300vh;
`

const Template = () => (
  <Container>
    <HeroUI />
  </Container>
)

export const Hero = Template.bind({})
Hero.args = {}

const Story = {
  title: 'Sections / Hero',
}

export default Story

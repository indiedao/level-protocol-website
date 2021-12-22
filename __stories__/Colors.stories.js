import React from 'react'
import styled from 'styled-components'

import StoryGrid from './StoryGrid'
import theme from '../util/theme'

const SectionTitle = styled.h2`
  grid-column: 1 / 6;
  font-family: ${props => props.theme.fontStacks.chicago};
  font-size: 6.4rem;
  line-height: 8.173rem;
  border-bottom: 2px solid black;
`

const Swatch = styled.div`
  height: 161.8px;
  width: 100px;
  border: 1px solid #eeeeee;
`

const ColorSwatch = styled(Swatch)`
  background-color: ${props => props.theme.colors[props.colorName]};
`

const HalftoneSwatch = styled(Swatch)`
  background: ${props => props.theme.colors[props.backgroundColor || 'white']}
    ${props => props.theme.halftones[props.halftoneName]};
`

const Info = styled.p`
  color: ${props => props.theme.colors.black};
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 0.34rem;

  &:before {
    content: '${props => props.name.replace(props.term, '')}';
    font-family: ${props => props.theme.fontStacks.chicago};
    font-size: 2.4rem;
    line-height: 3.2rem;
  }

  &:after {
    content: '${props => props.theme.colors[props.name]}';
    font-family: ${props => props.theme.fontStacks.geneva};
    font-size: 2rem;
    line-height: 2.8rem;
  }
`

const Color = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1.44rem;
`

const trueColors = Object.keys(theme.colors).filter(colorName =>
  /^true/.test(colorName),
)

const vibrantColors = Object.keys(theme.colors).filter(colorName =>
  /^vibrant/.test(colorName),
)

const mutedColors = Object.keys(theme.colors).filter(colorName =>
  /^muted/.test(colorName),
)

const ColorBlock = ({ colorName, term }) => (
  <Color>
    <ColorSwatch colorName={colorName} />
    <Info name={colorName} term={term} />
  </Color>
)

const HalftoneBlock = ({ backgroundColor, halftoneName }) => (
  <Color>
    <HalftoneSwatch
      backgroundColor={backgroundColor}
      halftoneName={halftoneName}
    />
    <Info name={halftoneName.toUpperCase()} />
  </Color>
)

const Template = ({ halftoneBackgroundColor }) => (
  <>
    <StoryGrid columns={5} columnWidth="100px">
      <SectionTitle>True</SectionTitle>
      {trueColors.map(colorName => (
        <ColorBlock colorName={colorName} term="true" key={colorName} />
      ))}
    </StoryGrid>
    <StoryGrid columns={5} columnWidth="100px">
      <SectionTitle>Vibrant</SectionTitle>
      {vibrantColors.map(colorName => (
        <ColorBlock colorName={colorName} term="vibrant" key={colorName} />
      ))}
    </StoryGrid>
    <StoryGrid columns={5} columnWidth="100px">
      <SectionTitle>Muted</SectionTitle>
      {mutedColors.map(colorName => (
        <ColorBlock colorName={colorName} term="muted" key={colorName} />
      ))}
    </StoryGrid>
    <StoryGrid columns={5} columnWidth="100px">
      <SectionTitle>Halftones</SectionTitle>
      {Object.keys(theme.halftones).map(halftoneName => (
        <HalftoneBlock
          halftoneName={halftoneName}
          key={halftoneName}
          backgroundColor={halftoneBackgroundColor}
        />
      ))}
    </StoryGrid>
  </>
)

export const Colors = Template.bind({})
Colors.args = {
  halftoneBackgroundColor: 'white',
}

const Story = {
  title: 'Design System / Colors',
  argTypes: {
    halftoneBackgroundColor: {
      options: [
        ...trueColors,
        ...vibrantColors,
        ...mutedColors,
        'black',
        'white',
      ],
      control: {
        type: 'select',
      },
    },
  },
}

export default Story

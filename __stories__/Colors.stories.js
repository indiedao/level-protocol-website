import React from 'react'
import styled from 'styled-components'

import StoryGrid from './StoryGrid'
import { H2 } from '../components/ui/Typography'
import theme from '../util/theme'

const SectionTitle = styled(H2)`
  grid-column: 1 / 6;
  border-bottom: 2px solid black;
`

const Swatch = styled.div`
  background-color: ${props => props.theme.colors[props.colorName]};
  height: 161.8px;
  width: 100px;
  border: 1px solid #eeeeee;
`

const Info = styled.p`
  color: ${props => props.theme.colors.black};
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 0.34rem;
  font-family: ChicagoFLFRegular;

  &:before {
    content: '${props => props.colorName.replace(props.term, '')}';
  }

  &:after {
    content: '${props => props.theme.colors[props.colorName]}';
    font-family: Geneva, Verdana;
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
    <Swatch colorName={colorName} />
    <Info colorName={colorName} term={term} />
  </Color>
)

export const All = () => (
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
  </>
)

const Story = {
  title: 'Colors',
}

export default Story

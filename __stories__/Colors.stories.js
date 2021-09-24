import React from 'react'
import styled from 'styled-components'

import StoryGrid from './StoryGrid'
import theme from '../util/theme'

const ColorBlock = styled.div`
  position: relative;
  background-color: ${props => props.theme.colors[props.color]};
  height: 100px;
  width: 100px;
  border-radius: 8px;
  border: 1px solid #eee;

  &:after {
    content: '${props => props.color}';
    position: absolute;
    background-color: white;
    border-radius: 3px;
    padding: 2px 3px;
    bottom: 10px;
    left: 10px;
  }
`

export const All = () => (
  <StoryGrid columns={10}>
    {Object.keys(theme.colors).map(color => (
      <div key={color}>
        <ColorBlock color={color} />
      </div>
    ))}
  </StoryGrid>
)

export default {
  title: 'Colors',
}

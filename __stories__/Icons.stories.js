import React from 'react'
import styled from 'styled-components'

import StoryGrid from './StoryGrid'
import * as icons from '../components/ui/icons'

const IconWrapper = styled.div`
  font-size: 12px;
  border: 1px solid ${props => props.theme.colors.vibrantBlack};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  color: ${props => props.theme.colors.black};
  border-radius: 2px;
  background-color: ${props => props.theme.colors.cream};
  box-shadow: 6px 6px 0px ${props => props.theme.colors.black};
`

export const All = () => (
  <StoryGrid columns={10}>
    {Object.entries(icons).map(icon => (
      <IconWrapper key={icon[0]}>
        {React.createElement(icon[1])}
        <div>{icon[0]}</div>
      </IconWrapper>
    ))}
  </StoryGrid>
)

const Story = {
  title: 'Icons',
}

export default Story

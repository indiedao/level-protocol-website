import styled, { css, keyframes } from 'styled-components'

const size = 1.6
const sizeRem = `${size}rem`
const beforeAfterOffset = size * 2
const defaultBackgroundColor = '#8f8d76'

const flashKeyframes = (props, percentages) => keyframes`
  ${percentages} {
    background-color: ${props.theme.colors.vibrantPixel};
  }
`

const flash = percentages => css`
  animation: ${props => flashKeyframes(props, percentages)} 1s steps(1, end)
    infinite normal;
`

const Loading = styled.div`
  position: relative;
  width: ${sizeRem};
  height: ${sizeRem};
  background-color: ${defaultBackgroundColor};
  margin: 0 ${sizeRem};
  ${flash('50%, 100%')};

  &::before,
  &::after {
    position: absolute;
    content: '';
    width: ${sizeRem};
    height: ${sizeRem};
    background-color: ${defaultBackgroundColor};
  }

  &::before {
    left: ${-beforeAfterOffset}rem;
    ${flash('25%, 100%')};
  }

  &::after {
    left: ${beforeAfterOffset}rem;
    ${flash('75%, 100%')};
  }
`

export default Loading

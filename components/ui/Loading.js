import styled, { css, keyframes } from 'styled-components'

const size = 16
const sizePx = `${size}px`
const beforeAfterOffset = size * 2
const defaultBackgroundColor = '#8f8d76'

const flashKeyframes = percentages => keyframes`
  ${percentages} {
    background-color: #fffcd8;
  }
`

const flash = percentages => css`
  animation: ${flashKeyframes(percentages)} 1s steps(1, end) infinite normal;
`

const Loading = styled.div`
  position: relative;
  width: ${sizePx};
  height: ${sizePx};
  background-color: ${defaultBackgroundColor};
  margin: 0 ${sizePx};
  ${flash('50%, 100%')};

  &::before,
  &::after {
    position: absolute;
    content: '';
    width: ${sizePx};
    height: ${sizePx};
    background-color: ${defaultBackgroundColor};
  }

  &::before {
    left: ${-beforeAfterOffset}px;
    ${flash('25%, 100%')};
  }

  &::after {
    left: ${beforeAfterOffset}px;
    ${flash('75%, 100%')};
  }
`

export default Loading

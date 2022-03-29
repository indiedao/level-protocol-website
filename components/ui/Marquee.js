import PropTypes from 'prop-types'
import styled, { css, keyframes } from 'styled-components'
import { H1 } from './AltTypography'

const Marquee = ({ content, duration }) => (
  <Wrapper>
    <Content duration={duration}>{content}</Content>
  </Wrapper>
)

Marquee.propTypes = {
  content: PropTypes.string.isRequired,
  duration: PropTypes.number,
}

Marquee.defaultProps = {
  duration: 120,
}

const marquee = keyframes`
  0% {
    transform: translatex(-100%)
  }

  100% {
    transform: translatex(100%)
  }
`

const Wrapper = styled.div`
  width: 100%;
  overflow: hidden;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  padding: 10px 0 3px;
`

const Content = styled(H1)`
  ${({ duration }) => css`
    animation: ${marquee} ${duration}s linear infinite;
    display: inline-block;
    white-space: nowrap;
  `}
`

export default Marquee

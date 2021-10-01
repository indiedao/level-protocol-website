import { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes, css } from 'styled-components'

const Wrapper = styled.div`
  position: relative;
  opacity: 0;
`

const fadeDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-${props => props.offset}px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
`

const FadeDownWrapper = styled(Wrapper)`
  transform: translateY(-${props => props.offset}px);
  animation: ${fadeDown} ${props => props.duration}ms forwards;
  animation-delay: ${props => props.delay}ms;
`

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(${props => props.offset}px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
`

const FadeUpWrapper = styled(Wrapper)`
  transform: translateY(${props => props.offset}px);
  animation: ${fadeUp} ${props => props.duration}ms forwards;
  animation-delay: ${props => props.delay}ms;
`

const fadeRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(-${props => props.offset}px);
  }
  to {
    opacity: 1;
    transform: translateX(0px);
  }
`

const FadeRightWrapper = styled(Wrapper)`
  transform: translateX(-${props => props.offset}px);
  animation: ${fadeRight} ${props => props.duration}ms forwards;
  animation-delay: ${props => props.delay}ms;
`

const fadeLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(${props => props.offset}px);
  }
  to {
    opacity: 1;
    transform: translateX(0px);
  }
`

const FadeLeftWrapper = styled(Wrapper)`
  transform: translateX(${props => props.offset}px);
  animation: ${fadeLeft} ${props => props.duration}ms forwards;
  animation-delay: ${props => props.delay}ms;
`

const zoomIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`

const ZoomInWrapper = styled(Wrapper)`
  transform: scale(0.9);
  animation: ${zoomIn} ${props => props.duration}ms forwards;
  animation-delay: ${props => props.delay}ms;
`

const WRAPPERS = {
  down: FadeDownWrapper,
  right: FadeRightWrapper,
  left: FadeLeftWrapper,
  up: FadeUpWrapper,
  zoomIn: ZoomInWrapper,
}

const DirectionalFadeIn = props => {
  const Wrapper = WRAPPERS[props.direction]
  return <Wrapper {...props} />
}

DirectionalFadeIn.propTypes = {
  delay: PropTypes.number,
  duration: PropTypes.number,
  offset: PropTypes.number,
  direction: PropTypes.oneOf(Object.keys(WRAPPERS)).isRequired,
  threshold: PropTypes.number,
}

DirectionalFadeIn.defaultProps = {
  delay: 0,
  duration: 800,
  offset: 10,
  threshold: 1,
}

export default DirectionalFadeIn

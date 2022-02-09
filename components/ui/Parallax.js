import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import debounce from 'debounce'
import PropTypes from 'prop-types'

import useSimpleObserver from '../hooks/useSimpleObserver'
import useScrollPosition from '../hooks/useScrollPosition'

const Wrapper = styled.div`
  position: relative;

  > * {
    position: relative;
    z-index: 1;
  }
`

const Background = styled.div`
  --height: 0;
  --translateY: 0;

  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: var(--height);
  background-image: url('/images/parallax.png');
  background-size: cover;
  transform: translateY(var(--translateY));
  z-index: 0;
  transition: transform 50ms ease;
`

const BACKGROUND_HEIGHT_FACTOR = 0.8
const BACKGROUND_MOVE_FACTOR = 0.4

const Parallax = ({ children }) => {
  const wrapperRef = useRef(null)
  const [wrapperHeight, setWrapperHeight] = useState(0)
  const [shouldListenToScroll, setShouldListenToScroll] = useState(false)
  const [startPoint, setStartPoint] = useState(0)
  const [backgroundOffset, setBackgroundOffset] = useState(0)

  const position = useScrollPosition()

  useEffect(() => {
    const setWrapperBounds = debounce(() => {
      if (wrapperRef.current) {
        const { height } = wrapperRef.current.getBoundingClientRect()
        if (height > 0 && height !== wrapperHeight) {
          setWrapperHeight(height)
        }
      }
    }, 250)

    setWrapperBounds()
    window.addEventListener('resize', setWrapperBounds)

    return () => window.removeEventListener('resize', setWrapperBounds)
  }, [wrapperHeight])

  useSimpleObserver(
    wrapperRef,
    entry => {
      const { isIntersecting } = entry
      if (isIntersecting && !shouldListenToScroll) {
        setShouldListenToScroll(true)
      } else if (!isIntersecting && shouldListenToScroll) {
        setShouldListenToScroll(false)
      }
    },
    [shouldListenToScroll],
  )

  useEffect(() => {
    if (shouldListenToScroll && position !== startPoint) {
      setStartPoint(position)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldListenToScroll])

  useEffect(() => {
    if (shouldListenToScroll) {
      setBackgroundOffset(
        Math.max(0, position - startPoint) * BACKGROUND_MOVE_FACTOR,
      )
    }
  }, [position, shouldListenToScroll, startPoint])

  return (
    <Wrapper ref={wrapperRef}>
      <Background
        style={{
          '--height': `${Math.floor(
            wrapperHeight * BACKGROUND_HEIGHT_FACTOR,
          )}px`,
          '--translateY': `${backgroundOffset}px`,
        }}
      />
      {children}
    </Wrapper>
  )
}

Parallax.propTypes = {
  children: PropTypes.node,
}

Parallax.defaultProps = {
  children: undefined,
}

export default Parallax

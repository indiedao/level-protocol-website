import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import useSimpleObserver from '../../hooks/useSimpleObserver'
import useTimeout from '../../hooks/useTimeout'
import { CHARACTER_SEQUENCE, CHARACTERS, COLUMNS, ROWS } from './characters'
import { COLORS, COLOR_SEQUENCE } from './colors'
import {
  DE_GLITCH_FACTOR,
  FLASH_MINIMUM_THRESHOLD,
  FLASH_PROBABILITY,
  GLITCH_BOUNCE_MAXIMUM,
  GLITCH_BOUNCE_PROBABILITY,
  GLITCH_SETTLED_THRESHOLD,
  GLITCH_SPEED,
  INITIAL_GLITCHY_NESS,
} from './glitchy-ness'

const Wrapper = styled.div`
  display: grid;
  justify-items: start;
  align-items: baseline;
  grid-template-columns: repeat(${COLUMNS}, 1fr);
  grid-template-rows: repeat(${ROWS}, 1fr);
  background-color: ${({ theme }) => theme.colors.vibrantBlack};
`

const WrappedCharacter = styled.span`
  color: ${({ color, theme }) => theme.colors[color || 'vibrantRed']};
  font-family: monaco, Consolas, 'Lucida Console', monospace;
`

const character = (index, char, color) => {
  return (
    <WrappedCharacter color={color} key={index}>
      {char}
    </WrappedCharacter>
  )
}

const durstenfeldShuffle = array => {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    // eslint-disable-next-line no-param-reassign
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

const Hero = ({
  deGlitchFactor,
  flashMinimumThreshold,
  flashProbability,
  glitchBounceMaximum,
  glitchBounceProbability,
  glitchSettledThreshold,
  glitchSpeed,
  initialGlitchyNess,
  pausedAtStart,
}) => {
  const heroEl = useRef(null)
  const [paused, setPaused] = useState(pausedAtStart)
  const [difference, setDifference] = useState(
    Math.floor(ROWS * COLUMNS * initialGlitchyNess),
  )
  const [characters, setCharacters] = useState(CHARACTER_SEQUENCE)
  const [colors, setColors] = useState(COLOR_SEQUENCE)

  useEffect(() => {
    setDifference(Math.floor(ROWS * COLUMNS * initialGlitchyNess))
  }, [deGlitchFactor, initialGlitchyNess])

  useSimpleObserver(
    heroEl,
    entry => {
      const { isIntersecting } = entry
      if (isIntersecting && paused) {
        setPaused(false)
      } else if (!isIntersecting && !paused) {
        setPaused(true)
      }
    },
    [paused],
  )

  useTimeout(
    () => {
      if (difference > ROWS * COLUMNS * glitchSettledThreshold) {
        setDifference(Math.floor(difference * deGlitchFactor))
      } else if (Math.random() < glitchBounceProbability) {
        setDifference(
          Math.floor(ROWS * COLUMNS * glitchBounceMaximum * Math.random()),
        )
      } else {
        setDifference(
          Math.floor(Math.random() * ROWS * COLUMNS * glitchSettledThreshold),
        )
      }
    },
    paused ? 0 : glitchSpeed,
  )

  useEffect(() => {
    const field = Array(difference).fill(true)
    field.length = ROWS * COLUMNS
    durstenfeldShuffle(field)
    if (
      difference > ROWS * COLUMNS * flashMinimumThreshold &&
      Math.random() < flashProbability
    ) {
      setColors(field.fill(COLORS[Math.floor(Math.random() * COLORS.length)]))
    } else if (Math.random() >= 0.5) {
      setCharacters(
        field.map((char, index) => {
          if (char) {
            return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]
          }
          return CHARACTER_SEQUENCE[index]
        }),
      )
    } else {
      setColors(
        field.map((char, index) => {
          if (char) {
            return COLORS[Math.floor(Math.random() * COLORS.length)]
          }
          return COLOR_SEQUENCE[index]
        }),
      )
    }
  }, [difference, flashMinimumThreshold, flashProbability])

  return (
    <Wrapper ref={heroEl}>
      {characters.map((char, index) => {
        return character(index, char, colors[index])
      })}
    </Wrapper>
  )
}

Hero.propTypes = {
  deGlitchFactor: PropTypes.number,
  flashMinimumThreshold: PropTypes.number,
  flashProbability: PropTypes.number,
  glitchBounceMaximum: PropTypes.number,
  glitchBounceProbability: PropTypes.number,
  glitchSettledThreshold: PropTypes.number,
  glitchSpeed: PropTypes.number,
  initialGlitchyNess: PropTypes.number,
  pausedAtStart: PropTypes.bool,
}

Hero.defaultProps = {
  deGlitchFactor: DE_GLITCH_FACTOR,
  flashMinimumThreshold: FLASH_MINIMUM_THRESHOLD,
  flashProbability: FLASH_PROBABILITY,
  glitchBounceMaximum: GLITCH_BOUNCE_MAXIMUM,
  glitchBounceProbability: GLITCH_BOUNCE_PROBABILITY,
  glitchSettledThreshold: GLITCH_SETTLED_THRESHOLD,
  glitchSpeed: GLITCH_SPEED,
  initialGlitchyNess: INITIAL_GLITCHY_NESS,
  pausedAtStart: false,
}

export default Hero

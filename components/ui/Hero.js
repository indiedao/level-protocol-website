import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const COLUMNS = 120

const ROWS = 24

const CHARACTERS = ['.', ',', ';', ':', '+', '*', '?', 'S', '%', '#', '@']

const COLORS = ['vibrantRed', 'vibrantBlue', 'vibrantGreen', 'trueWhite']

const BLUE_CHARACTERS = [
  [],
  [],
  [],
  [],
  [],
  [101, 102, 103, 104, 105, 106],
  [104, 105, 106],
  [],
  [22, 23, 24, 25, 97, 98, 99],
  [47, 56, 57, 58, 59, 65, 66, 67, 68, 87, 88, 89, 105, 106, 107],
  [22, 23, 43, 44, 45, 46, 58, 59, 60, 61, 69, 70, 71, 90, 91, 92, 105, 106],
  [
    40, 41, 42, 43, 56, 57, 58, 59, 70, 71, 81, 82, 83, 84, 89, 90, 91, 92, 93,
    94,
  ],
  [46, 47, 48, 49, 58, 59, 60, 68, 69, 70, 71, 100, 101, 102, 103, 104],
  [23, 24, 25, 26, 27, 45, 46, 47, 48, 56, 57, 58, 59, 85, 86, 87, 88],
  [
    22, 23, 24, 25, 26, 36, 37, 38, 39, 40, 41, 59, 60, 61, 62, 63, 69, 70, 71,
    105, 106,
  ],
  [21, 22, 23, 37, 38, 39, 40, 41, 62, 63, 64],
  [
    24, 25, 26, 27, 46, 47, 48, 63, 64, 65, 67, 89, 90, 91, 104, 105, 106, 107,
    108, 109,
  ],
  [
    27, 28, 29, 30, 44, 45, 46, 47, 63, 64, 65, 66, 85, 86, 87, 88, 108, 109,
    110, 111,
  ],
  [
    25, 26, 27, 28, 29, 30, 31, 32, 33, 46, 47, 48, 49, 50, 61, 62, 63, 64, 65,
    87, 88, 108, 109,
  ],
  [],
  [],
  [],
  [],
  [],
]

const WHITE_CHARACTERS = [
  [],
  [],
  [],
  [],
  [100, 101],
  [],
  [20],
  [14],
  [],
  [15, 55, 100],
  [],
  [77, 78],
  [33, 54, 67, 85, 86],
  [37, 38, 39],
  [16, 17, 18, 68, 78],
  [54, 55, 56, 105, 106],
  [68, 81, 82, 111],
  [20, 21, 48, 49],
  [37, 38],
  [],
  [],
  [],
  [],
  [],
]

const GREEN_CHARACTERS = [
  [],
  [],
  [],
  [],
  [16, 17, 18],
  [16, 17, 18, 19],
  [13, 14, 15, 16, 21, 22, 99, 100, 101, 102, 103],
  [10, 11, 12, 13, 15, 16, 17, 18, 100, 101, 102, 103],
  [10, 11, 12, 13, 16, 17, 18, 19, 20, 21, 101, 102, 103, 104],
  [
    10, 11, 12, 13, 18, 19, 20, 21, 22, 41, 42, 43, 44, 45, 80, 81, 82, 83, 84,
    85, 86, 102, 103, 104,
  ],
  [
    16, 17, 36, 37, 38, 39, 40, 41, 42, 54, 55, 56, 57, 62, 63, 64, 65, 66, 67,
    68, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 100, 101, 102, 103,
  ],
  [
    16, 17, 18, 19, 20, 32, 33, 34, 35, 36, 44, 45, 46, 47, 48, 54, 55, 66, 67,
    68, 69, 85, 86, 87, 88, 102, 103, 104, 105,
  ],
  [16, 17, 18, 34, 35, 36, 37, 43, 44, 45, 55, 56, 57, 74, 75, 76, 87],
  [
    16, 17, 18, 19, 20, 21, 22, 33, 34, 35, 36, 42, 43, 65, 66, 67, 68, 69, 74,
    75, 76, 77, 100, 101, 102, 103,
  ],
  [34, 35, 55, 56, 57, 58, 66, 67, 75, 76, 77, 102, 103, 104],
  [
    20, 33, 34, 35, 36, 57, 58, 59, 60, 61, 72, 73, 74, 75, 76, 77, 78, 100,
    101, 102, 103, 104,
  ],
  [
    34, 35, 36, 37, 38, 39, 40, 57, 58, 59, 60, 61, 62, 76, 77, 78, 79, 80, 87,
    88, 100, 101, 102, 103,
  ],
  [
    22, 23, 24, 25, 26, 35, 36, 37, 38, 39, 40, 41, 42, 43, 58, 59, 60, 61, 62,
    76, 77, 78, 79, 80, 81, 82, 83, 84, 104, 105, 106, 107,
  ],
  [
    22, 23, 24, 41, 42, 43, 44, 45, 60, 79, 80, 81, 82, 83, 84, 85, 86, 103,
    104, 105, 106, 107,
  ],
  [],
  [],
  [],
  [],
  [],
]

const FINAL_CHARACTERS = `
........................................................................................................................
........................................................................................................................
........................................................................................................................
........................................................................................................................
...............,,,.................................................................................,,,..................
...............*##;................................................................................S#S..................
............;%%#@@S??,..........................................................................*%%@@@??*...............
.........,;;*SS@@@@@@:.............................,;;,......................................:;;%S#@@@@@S...............
.........;@@%..?@@@@@:.............................+@@*......................................?@@;.,#@@@@S...............
.........,::,..?@@@@@:..............?#######%......,::?##;....,S#%............%#######?......,::,.,#@@@@S...............
...............?@@@@@:...........:**???@@@@@@?*+...:**S@@;..**?@@@**;......;**???@@@@@#**;........,#@@@@S...............
...............?@@@@@:........,::?@@+..%##@@@##%...*@@@@@;.,S##@@@@@%...,::S@@:..S##@@@##*........,#@@@@S...............
...............?@@@@@:........;@@@@@+....,@@#,,....+@@@@@;..,,:@@@@@%...*@@@@@:....:@@S,,.........,#@@@@S...............
...............?@@@@@:........+@@@@@+..?SS+;;......+@@@@@;.....;;+@@%...*@@@@@:.,%S%;;:...........,#@@@@S...............
...............?@@@@@:........+@@@@@+..?%%,........*@@@@@?++,.,++*%%+...*@@@@@:.,?%?..............,#@@@@S...............
...............?@@@@@:..,,,...+@@@@@*,,......,,,...+@@@@@@@@;,:#@S......*@@@@@;,,.....,,,,........,#@@@@S..,,,,.........
...............?@@@@@:.,#@S...+@@@@@@@@:....,@@%...,,,%@@@@@@@#:,,......?@@@@@@@#,....;@@?........,#@@@@S..+@@*.........
...............:++#@@S%%++;...:++%@@@@@S%%%%%++;......:++#@@*++.........:++#@@@@@%%%%%?++:.........++*@@@%%?++:.........
..................*SSSS%.........+SSSSSSSSSS%............?SS,..............*SSSSSSSSSS?..............,%SSSS*............
........................................................................................................................
........................................................................................................................
........................................................................................................................
........................................................................................................................
........................................................................................................................
`
  .replace(/\n/g, '')
  .split('')

const colorSequence = [...FINAL_CHARACTERS].fill('vibrantRed')

for (let rowIndex = 0; rowIndex < ROWS; rowIndex += 1) {
  GREEN_CHARACTERS[rowIndex].forEach(colIndex => {
    colorSequence[rowIndex * COLUMNS + colIndex] = 'vibrantGreen'
  })

  BLUE_CHARACTERS[rowIndex].forEach(colIndex => {
    colorSequence[rowIndex * COLUMNS + colIndex] = 'vibrantBlue'
  })

  WHITE_CHARACTERS[rowIndex].forEach(colIndex => {
    colorSequence[rowIndex * COLUMNS + colIndex] = 'trueWhite'
  })
}

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

const useTimeout = (callback, delay) => {
  const savedCallback = useRef(callback)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    let timerId = null

    const tick = () => {
      const ret = savedCallback.current()

      if (ret instanceof Promise) {
        ret
          .then(() => {
            if (delay > 0) {
              timerId = setTimeout(tick, delay)
            }
          })
          .catch(error => {
            console.log(error) // eslint-disable-line no-console
            if (timerId) {
              clearTimeout(timerId)
            }
          })
      } else if (delay > 0) {
        timerId = setTimeout(tick, delay)
      }
    }

    if (delay > 0) {
      timerId = setTimeout(tick, delay)
    }

    return () => timerId && clearTimeout(timerId)
  }, [delay])
}

const useSimpleObserver = (callback, ref, deps) => {
  useEffect(() => {
    let observer = null
    let el = null

    if (ref.current) {
      el = ref.current
      observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => callback(entry))
        },
        {
          threshold: 0,
        },
      )

      observer.observe(el)
    }

    return () => {
      if (observer && el) {
        observer.unobserve(el)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback, ref, ...deps])
}

const durstenfeldShuffle = array => {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    // eslint-disable-next-line no-param-reassign
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

const Hero = ({
  differenceStart,
  degradeFactor,
  flashImpactThreshold,
  flashThreshold,
  glitchBounceThreshold,
  glitchSpeed,
  pausedAtStart,
}) => {
  const heroEl = useRef(null)
  const [paused, setPaused] = useState(pausedAtStart)
  const [difference, setDifference] = useState(
    Math.floor(ROWS * COLUMNS * differenceStart),
  )
  const [characters, setCharacters] = useState(FINAL_CHARACTERS)
  const [colors, setColors] = useState(colorSequence)

  useSimpleObserver(
    entry => {
      const { isIntersecting } = entry
      if (isIntersecting && paused) {
        setPaused(false)
      } else if (!isIntersecting && !paused) {
        setPaused(true)
      }
    },
    heroEl,
    [paused],
  )

  useTimeout(
    () => {
      if (difference > 10) {
        setDifference(Math.floor(difference * degradeFactor))
      } else if (Math.random() > glitchBounceThreshold) {
        setDifference(
          Math.floor(ROWS * COLUMNS * (1 - differenceStart) * Math.random()),
        )
      } else {
        setDifference(Math.floor(Math.random() * 10))
      }
    },
    paused ? 0 : glitchSpeed,
  )

  useEffect(() => {
    const chars = Array(difference).fill(true)
    chars.length = ROWS * COLUMNS
    durstenfeldShuffle(chars)
    if (
      difference > ROWS * COLUMNS * flashImpactThreshold &&
      Math.random() > flashThreshold
    ) {
      setColors(chars.fill(COLORS[Math.floor(Math.random() * COLORS.length)]))
    } else if (Math.random() >= 0.5) {
      setCharacters(
        chars.map((char, index) => {
          if (char) {
            return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]
          }
          return FINAL_CHARACTERS[index]
        }),
      )
    } else {
      setColors(
        chars.map((char, index) => {
          if (char) {
            return COLORS[Math.floor(Math.random() * COLORS.length)]
          }
          return colorSequence[index]
        }),
      )
    }
  }, [difference, flashImpactThreshold, flashThreshold])

  return (
    <Wrapper ref={heroEl}>
      {characters.map((char, index) => {
        return character(index, char, colors[index])
      })}
    </Wrapper>
  )
}

Hero.propTypes = {
  differenceStart: PropTypes.number,
  degradeFactor: PropTypes.number,
  flashImpactThreshold: PropTypes.number,
  flashThreshold: PropTypes.number,
  glitchBounceThreshold: PropTypes.number,
  glitchSpeed: PropTypes.number,
  pausedAtStart: PropTypes.bool,
}

Hero.defaultProps = {
  differenceStart: 0.95,
  degradeFactor: 0.6182,
  flashImpactThreshold: 0.7,
  flashThreshold: 0.7,
  glitchBounceThreshold: 0.95,
  glitchSpeed: 100,
  pausedAtStart: false,
}

export default Hero

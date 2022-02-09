import { useCallback, useMemo, createContext, useState } from 'react'

const ScrollContext = createContext({
  position: 0,
  updatePosition: () => {},
})

export const ScrollProvider = ({ children }) => {
  const [position, setPosition] = useState(0)

  const updatePosition = useCallback(
    newPosition => {
      if (newPosition !== position) {
        setPosition(newPosition)
      }
    },
    [position],
  )

  const value = useMemo(
    () => ({
      position,
      updatePosition,
    }),
    [position, updatePosition],
  )

  return (
    <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>
  )
}

export default ScrollContext

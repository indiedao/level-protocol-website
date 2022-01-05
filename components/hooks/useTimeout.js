// adapted from:
// https://www.aaron-powell.com/posts/2019-09-23-recursive-settimeout-with-react-hooks/
import { useEffect, useRef } from 'react'

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

export default useTimeout

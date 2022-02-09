import { useContext, useEffect } from 'react'

import ScrollContext from '../contexts/ScrollContext'

const useScrollListener = ref => {
  const { updatePosition } = useContext(ScrollContext)

  useEffect(() => {
    let internalRef

    const onScroll = () => {
      if (ref.current) {
        updatePosition(ref.current.scrollTop)
      }
    }

    if (ref.current) {
      ref.current.addEventListener('scroll', onScroll)
      internalRef = ref.current
    }

    return () => {
      if (internalRef) {
        internalRef.removeEventListener('scroll', onScroll)
      }
    }
  }, [ref, updatePosition])
}

export default useScrollListener

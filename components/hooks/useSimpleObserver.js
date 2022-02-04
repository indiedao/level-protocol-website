import { useEffect } from 'react'

const useSimpleObserver = (ref, callback, deps) => {
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

export default useSimpleObserver

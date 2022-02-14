import { useEffect, useState } from 'react'

const useTruncatedAddress = address => {
  const [truncatedAddress, setTruncatedAddress] = useState()

  useEffect(() => {
    const pre = address.slice(0, 5)
    const suf = address.slice(address.length - 3, address.length)
    setTruncatedAddress(`${pre}...${suf}`)
  }, [address])

  return { truncatedAddress }
}

export default useTruncatedAddress

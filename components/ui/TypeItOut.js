import { useEffect, useState } from 'react'

const TypeItOut = ({ message }) => {
  const [content, setContent] = useState([])

  // Kick off animation:
  useEffect(() => {
    const addChar = () => {
      const nextChar = message[content.length]
      const newContent = content.concat(nextChar)
      setContent(newContent)
    }

    let timeout
    if (content.length < message.length) {
      timeout = setTimeout(addChar, 40)
    }

    // Cancel timeout if component unmounts:
    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [content, message])

  // Reset on message change:
  useEffect(() => {
    setContent([])
  }, [message])

  return <>{content.join('')}</>
}

export default TypeItOut

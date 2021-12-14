import styled from 'styled-components'
import Head from 'next/head'
import { useState, useEffect } from 'react'

import Animation from '../../util/animation'

const Level = () => {
  const [animation, setAnimation] = useState()

  useEffect(() => {
    setAnimation(new Animation())
  }, [])

  return (
    <div>
      <Head>
        <title>Level Protocol</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {animation && <ClickWrapper onClick={animation.rotatePyramid} />}
      </main>
    </div>
  )
}

const ClickWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  cursor: pointer;
`

export default Level

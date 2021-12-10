import React from 'react'
import Link from 'next/link'

import Toolbar from '../components/ui/Toolbar'
import { LevelLogo } from '../components/ui/icons'

export const All = () => (
  <Toolbar
    brand={
      <>
        <LevelLogo />
        Level Protocol
      </>
    }
  >
    <>
      <li>
        <Link href="/about">About</Link>
      </li>
      <li>
        <Link href="/join">Join</Link>
      </li>
    </>
  </Toolbar>
)

const Story = {
  title: 'Toolbar',
}

export default Story

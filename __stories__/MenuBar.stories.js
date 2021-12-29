import React from 'react'
import Link from 'next/link'

import MenubarUI from '../components/ui/MenuBar'

const Template = () => (
  <MenubarUI>
    <>
      <li>
        <Link href="/about">About</Link>
      </li>
      <li>
        <Link href="/join">Join</Link>
      </li>
    </>
  </MenubarUI>
)

export const MenuBar = Template.bind({})

const Story = {
  title: 'Design System / Menu Bar',
}

export default Story

import React from 'react'
import Link from 'next/link'

import MenubarUI from '../components/ui/MenuBar'

const Template = () => (
  <MenubarUI>
    <Link href="/about">About</Link>
    <Link href="/join">Join</Link>
  </MenubarUI>
)

export const MenuBar = Template.bind({})

const Story = {
  title: 'Design System / Menu Bar',
}

export default Story

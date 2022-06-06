import Link from 'next/link'
import MenuBar from './MenuBar'

const PublicMenuBar = () => (
  <MenuBar>
    <Link href="/join">join</Link>
    {/* <Link href="/access-list">access list</Link> */}
    <a
      href="https://indiedao.gitbook.io/indiedao/products/lvl-protocol"
      rel="noopener noreferrer"
      target="_blank"
    >
      docs
    </a>
  </MenuBar>
)
export default PublicMenuBar

import Link from '../ui/Link'

const AdminMenu = () => {
  return (
    <ul>
      <li>
        <Link href="/dao/settings">Settings</Link>
      </li>
      <li>
        <Link href="/dao/integrations">Integrations</Link>
      </li>
      <li>
        <Link href="/dao/skills">Skills</Link>
      </li>
      <li>
        <Link href="/dao/skill-sets">Skill sets</Link>
      </li>
    </ul>
  )
}

export default AdminMenu

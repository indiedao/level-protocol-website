import DaoLayout from '../../../components/layouts/Dao'
import Link from '../../../components/ui/Link'

const Skills = () => {
  return (
    <DaoLayout title="Skills">
      <h2>Options</h2>
      <ul>
        <li>
          <Link href="/dao/skills/some-id">Skill Details</Link>
        </li>
      </ul>
    </DaoLayout>
  )
}

export default Skills


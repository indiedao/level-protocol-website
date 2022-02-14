import DaoLayout from '../../../components/layouts/Dao'
import Link from '../../../components/ui/Link'

const SkillSets = () => {
  return (
    <DaoLayout title="Skill Sets">
      <h2>Options</h2>
      <ul>
        <li>
          <Link href="/dao/skill-sets/register">Register</Link>
        </li>
        <li>
          <Link href="/dao/skill-sets/some-id/configure">Configure</Link>
        </li>
      </ul>
    </DaoLayout>
  )
}

export default SkillSets

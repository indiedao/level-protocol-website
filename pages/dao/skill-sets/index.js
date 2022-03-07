import DaoLayout from '../../../components/layouts/Dao'
import useCommunity from '../../../components/hooks/useCommunity'
import RestrictedAreaView from '../../../components/views/RestrictedAreaView'
import Link from '../../../components/ui/Link'

const SkillSets = () => {
  const { isAdmin } = useCommunity()

  return (
    <DaoLayout title="DAO">
      {isAdmin ? (
        <>
          <h2>Options</h2>
          <ul>
            <li>
              <Link href="/dao/skill-sets/register">Register</Link>
            </li>
            <li>
              <Link href="/dao/skill-sets/some-id/configure">Configure</Link>
            </li>
          </ul>
          )
        </>
      ) : (
        <RestrictedAreaView />
      )}
    </DaoLayout>
  )
}

export default SkillSets

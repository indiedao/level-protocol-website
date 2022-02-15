import DaoLayout from '../../components/layouts/Dao'
import Link from '../../components/ui/Link'
import useCommunity from '../../components/hooks/useCommunity'
import { Body1 } from '../../components/ui/Typography'

const DaoIndex = () => {
  const { isAdmin } = useCommunity()
  return (
    <DaoLayout title="DAO">
      <h2>Options</h2>
      {isAdmin ? (
        <ul>
          <li>
            <Link href="/dao/settings">Settings</Link>
          </li>
        </ul>
      ) : (
        <Body1>Admin permissions required</Body1>
      )}
    </DaoLayout>
  )
}

export default DaoIndex

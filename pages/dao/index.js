import DaoLayout from '../../components/layouts/Dao'
import Link from '../../components/ui/Link'

const DaoIndex = () => {
  return (
    <DaoLayout title="DAO">
      <h2>Options</h2>
      <ul>
        <li>
          <Link href="/dao/settings">Settings</Link>
        </li>
      </ul>
    </DaoLayout>
  )
}

export default DaoIndex

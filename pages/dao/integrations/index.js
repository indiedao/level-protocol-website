import DaoLayout from '../../../components/layouts/Dao'
import Link from '../../../components/ui/Link'

const Integrations = () => {
  return (
    <DaoLayout title="Integrations">
      <h2>Options</h2>
      <ul>
        <li>
          <Link href="/dao/integrations/some-id">Integration Details</Link>
        </li>
      </ul>
    </DaoLayout>
  )
}

export default Integrations


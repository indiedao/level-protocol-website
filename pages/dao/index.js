import DaoLayout from '../../components/layouts/Dao'
import useCommunity from '../../components/hooks/useCommunity'
import RestrictedAreaView from '../../components/views/RestrictedAreaView'
import AdminView from '../../components/views/AdminView'

const IntegrationsIndex = () => {
  const { isAdmin } = useCommunity()

  return (
    <DaoLayout title="DAO">
      <h2>DAO Admin</h2>
      {isAdmin ? <AdminView /> : <RestrictedAreaView />}
    </DaoLayout>
  )
}

export default IntegrationsIndex

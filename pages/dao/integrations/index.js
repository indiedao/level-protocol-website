import DaoLayout from '../../../components/layouts/Dao'
import useCommunity from '../../../components/hooks/useCommunity'
import RestrictedAreaView from '../../../components/views/RestrictedAreaView'
import IntegrationsView from '../../../components/views/IntegrationsView'

const IntegrationsIndex = () => {
  const { isAdmin } = useCommunity()

  return (
    <DaoLayout title="DAO">
      <h2>DAO Integrations</h2>
      {isAdmin ? <IntegrationsView /> : <RestrictedAreaView />}
    </DaoLayout>
  )
}

export default IntegrationsIndex

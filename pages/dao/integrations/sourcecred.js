import DaoLayout from '../../../components/layouts/Dao'
import useCommunity from '../../../components/hooks/useCommunity'
import RestrictedAreaView from '../../../components/views/RestrictedAreaView'
import SourcecredView from '../../../components/views/SourcecredView'

const IntegrationsIndex = () => {
  const { isAdmin } = useCommunity()

  return (
    <DaoLayout title="DAO">
      <h2>Sourcecred Integration</h2>
      {isAdmin ? <SourcecredView /> : <RestrictedAreaView />}
    </DaoLayout>
  )
}

export default IntegrationsIndex

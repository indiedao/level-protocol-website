import DaoLayout from '../../components/layouts/Dao'
import useCommunity from '../../components/hooks/useCommunity'
import RestrictedAreaView from '../../components/views/RestrictedAreaView'

const DaoSettings = () => {
  const { isAdmin } = useCommunity()

  return (
    <DaoLayout title="DAO Settings">
      {isAdmin ? <h2>Coming soon</h2> : <RestrictedAreaView />}
    </DaoLayout>
  )
}

export default DaoSettings

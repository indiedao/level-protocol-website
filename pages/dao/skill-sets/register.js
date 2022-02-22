import DaoLayout from '../../components/layouts/Dao'
import useCommunity from '../../components/hooks/useCommunity'
import RestrictedAreaView from '../../components/views/RestrictedAreaView'

const Register = () => {
  const { isAdmin } = useCommunity()

  return (
    <DaoLayout title="DAO">
      {isAdmin ? <h2>Coming soon</h2> : <RestrictedAreaView />}
    </DaoLayout>
  )
}

export default Register

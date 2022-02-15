import useWeb3 from '../../../components/hooks/useWeb3'
import DaoLayout from '../../../components/layouts/Dao'
import CoordinapeView from '../../../components/views/CoordinapeView'
import Button from '../../../components/ui/Button'

const CoordinapeIntegration = () => {
  const { address, connect } = useWeb3()

  return (
    <DaoLayout title="Coordinape Integration">
      {address ? (
        <CoordinapeView />
      ) : (
        <Button onClick={connect}>Connect Wallet</Button>
      )}
    </DaoLayout>
  )
}

export default CoordinapeIntegration

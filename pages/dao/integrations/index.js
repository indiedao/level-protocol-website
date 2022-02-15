import useWeb3 from '../../../components/hooks/useWeb3'
import DaoLayout from '../../../components/layouts/Dao'
import IntegrationsView from '../../../components/views/IntegrationsView'
import Button from '../../../components/ui/Button'

const Integrations = () => {
  const { address, connect } = useWeb3()
  return (
    <DaoLayout title="Integrations">
      {address ? (
        <IntegrationsView />
      ) : (
        <Button onClick={connect}>Connect Wallet</Button>
      )}
    </DaoLayout>
  )
}

export default Integrations

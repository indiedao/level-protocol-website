import useWeb3 from '../../../components/hooks/useWeb3'
import DaoLayout from '../../../components/layouts/Dao'
import Button from '../../../components/ui/Button'
import PoapView from '../../../components/integrations/views/poap/PoapView'

const PoapIntegration = () => {
  const { address, connect } = useWeb3()

  return (
    <DaoLayout title="POAP Integration">
      {address ? (
        <PoapView />
      ) : (
        <Button onClick={connect}>Connect Wallet</Button>
      )}
    </DaoLayout>
  )
}

export default PoapIntegration

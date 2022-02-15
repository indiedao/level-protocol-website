import useWeb3 from '../../../components/hooks/useWeb3'
import DaoLayout from '../../../components/layouts/Dao'
import SourcecredView from '../../../components/views/SourcecredView'
import Button from '../../../components/ui/Button'

const SourcecredIntegration = () => {
  const { address, connect } = useWeb3()

  return (
    <DaoLayout title="Sourcecred Integration">
      {address ? (
        <SourcecredView />
      ) : (
        <Button onClick={connect}>Connect Wallet</Button>
      )}
    </DaoLayout>
  )
}

export default SourcecredIntegration

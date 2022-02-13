import useConfigurator from '../../hooks/useConfigurator'
import Button from '../../ui/Button'

const SaveConfiguratorView = () => {
  const { save } = useConfigurator()

  return <Button onClick={save}>Save</Button>
}

export default SaveConfiguratorView

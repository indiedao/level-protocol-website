import useConfigurator from '../../hooks/useConfigurator'
import Button from '../../ui/Button'
import ConfiguratorControlsView from './ConfiguratorControlsView'

const SaveConfiguratorView = () => {
  const { previousStep, save } = useConfigurator()

  return (
    <div>
      <Button onClick={save}>Save</Button>
      <ConfiguratorControlsView a={save} b={previousStep} />
    </div>
  )
}

export default SaveConfiguratorView

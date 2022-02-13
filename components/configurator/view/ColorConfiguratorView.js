import useConfigurator from '../../hooks/useConfigurator'

const ColorConfiguratorView = () => {
  const { setColor, color } = useConfigurator()

  return <div>Pick a color! Current color: {color}</div>
}

export default ColorConfiguratorView

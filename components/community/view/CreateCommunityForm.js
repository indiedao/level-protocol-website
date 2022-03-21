import { useEffect, useState } from 'react'
import useCreateCommunity from '../../hooks/useCreateCommunity'

const CreateCommunityForm = () => {
  const [name, setName] = useState('')
  const [isDisabled, setIsDisabled] = useState(true)
  const { createCommunity } = useCreateCommunity()

  useEffect(() => {
    if (name.trim().length > 2) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [name])

  return (
    <div>
      <h2>Create Community</h2>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
      <button
        disabled={isDisabled}
        type="button"
        onClick={() => createCommunity({ name })}
      >
        create
      </button>
    </div>
  )
}

export default CreateCommunityForm

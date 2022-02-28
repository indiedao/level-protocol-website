import { useState } from 'react'
import useCreateCommunity from '../../hooks/useCreateCommunity'

const CreateCommunityForm = () => {
  const [name, setName] = useState('')
  const { createCommunity } = useCreateCommunity()

  return (
    <div>
      <h2>Create Community</h2>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
      <button type="button" onClick={() => createCommunity({ name })}>
        create
      </button>
    </div>
  )
}

export default CreateCommunityForm

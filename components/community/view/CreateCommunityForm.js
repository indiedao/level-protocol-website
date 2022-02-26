import { useState } from 'react'
import useWeb3 from '../../hooks/useWeb3'

const CreateCommunityForm = () => {
  const { bearerToken } = useWeb3()
  const [name, setName] = useState('')

  const createCommunity = async () => {
    // Create community by API:
    fetch('/api/create-community', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${bearerToken}`,
      },
      body: JSON.stringify({
        name,
      }),
    })
  }

  return (
    <div>
      <h2>Create Community</h2>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
      <button type="button" onClick={createCommunity}>
        create
      </button>
    </div>
  )
}

export default CreateCommunityForm

import { useState } from 'react'
import useWeb3 from '../../hooks/useWeb3'

const CreateCommunityForm = () => {
  const { address, signer } = useWeb3()
  const [name, setName] = useState('')

  const createCommunity = async () => {
    // TODO: abstract signing to initial login and store in localstorage (instead of signing on every action)
    // Sign message to login:
    const sig = await signer.signMessage(
      `I am signing into lvl protocol as ${address}`,
    )

    // Create community by API:
    fetch('/api/create-community', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        sig,
        address,
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

import { useState } from 'react'
import Button from '../../../ui/Button'

const PoapEventInput = ({ onSubmit }) => {
  const [input, setInput] = useState('')

  const handleSubmit = () => {
    onSubmit(input.split(','))
  }

  return (
    <div>
      <textarea
        placeholder="Enter event IDs, e.g. 46613, 46428"
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  )
}

export default PoapEventInput

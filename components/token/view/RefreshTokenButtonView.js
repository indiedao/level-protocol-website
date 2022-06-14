import Button from '../../ui/Button'

const RefreshTokenButtonView = ({ address }) => {
  const refresh = async () => {
    await fetch('/api/update-member-cache', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        address,
      }),
    })
  }

  return <Button onClick={refresh}>Refresh</Button>
}

export default RefreshTokenButtonView

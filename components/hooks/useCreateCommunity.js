import useWeb3 from './useWeb3'

const useCreateCommunity = () => {
  const { bearerToken } = useWeb3()

  const createCommunity = async ({ name }) => {
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

  return { createCommunity }
}

export default useCreateCommunity

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useWeb3 from '../../../components/hooks/useWeb3'

const GithubCallback = () => {
  const [loading, setLoading] = useState()
  const router = useRouter()
  const { bearerToken } = useWeb3()

  const parseCode = useCallback(async () => {
    const params = router.asPath.split('?')[1]
    const code = params.split('=')[1]
    if (!code) throw new Error('Missing code from Github!')
    return code
  }, [router])

  const attest = useCallback(
    async code => {
      const resp = await fetch('/api/attest/github', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${bearerToken}`,
        },
        body: JSON.stringify({
          code,
        }),
      })
      const json = await resp.json()
      console.log(json)
    },
    [bearerToken],
  )

  useEffect(() => {
    const handleCode = async () => {
      try {
        setLoading(true)
        const code = await parseCode()
        console.log(code)
        await attest(code)
        // window.location = '/'
      } catch (e) {
        console.log(e) // eslint-disable-line no-console
        // window.location = '/401'
      }
    }

    if (bearerToken && !loading) handleCode()
  }, [parseCode, attest, bearerToken])

  return <h1>Logging in...</h1>
}

export default GithubCallback

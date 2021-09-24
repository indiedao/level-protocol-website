import axios from 'axios'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const AuthCallback = () => {
  const router = useRouter()

  async function parseToken() {
    let token, accessToken
    const query = router.asPath.split('#')[1]
    const params = query.split('&')
    params.forEach(param => {
      const pair = param.split('=')
      const key = decodeURIComponent(pair[0])
      const value = decodeURIComponent(pair[1])
      /**
       * Cognito ID Token:
       *
       * The ID token contains claims about the identity of the authenticated user such as name , email , and phone_number:
       */
      if (key == 'id_token') token = value
      /**
       * Cognito Access Token:
       *
       * The access token contains scopes and groups and is used to grant access to authorized resources:
       */
      // if (key == 'access_token') accessToken = value
    })
    if (!token) throw new Error(`Bad token!`)
    return token
  }

  async function setToken(token) {
    await axios.post('/api/set-token', {
      token,
    })
  }

  // Parse callback token, and set in api cookie:
  useEffect(async () => {
    try {
      const token = await parseToken()
      await setToken(token)
      window.location = '/'
    } catch (e) {
      console.log(e)
      window.location = '/401'
    }
  }, [])

  return <h1>Logging in...</h1>
}

export default AuthCallback

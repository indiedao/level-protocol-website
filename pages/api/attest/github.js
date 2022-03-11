import fetch from 'node-fetch'
import withMethods from '../../../util/api/withMethods'
import withAuth from '../../../util/api/withAuth'
import withValidParams from '../../../util/api/withValidParams'
import { githubClientId } from '../../../util/constants'
import { findMemberByAddress, updateMemberGithub } from '../../../util/fauna'

async function getAccessToken(code) {
  const resp = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      client_id: githubClientId,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    }),
  })
  const json = await resp.json()

  if (json.error) {
    console.log(json) // eslint-disable-line no-console
    throw new Error('Problem verifying with Github!')
  }

  return json.access_token
}

async function getUsername(token) {
  const resp = await fetch('https://api.github.com/user', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `token ${token}`,
    },
  })
  const json = await resp.json()
  return json.login
}

const handler = async (req, res, { auth: { address } }) => {
  const { code } = req.body

  const member = await findMemberByAddress(address)
  const accessToken = await getAccessToken(code)
  const username = await getUsername(accessToken)
  await updateMemberGithub({ id: member._id, github: username })

  // TODO: wire up username to Member config in fauna

  res.statusCode = 200
  res.json({ success: true })
}

export default withAuth(
  withValidParams(
    {
      code: {
        presence: true,
      },
    },
    withAuth(withMethods(['POST'], handler)),
  ),
)

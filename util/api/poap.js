import fetch from 'node-fetch'

export const getPoapEvent = async id => {
  const resp = await fetch(`https://api.poap.tech/events/id/${id}`)
  return resp.json()
}

import Bottleneck from 'bottleneck'

const gatewayUrl = process.env.IPFS_GATEWAY_URL

const rateLimit = parseInt(process.env.IPFS_GATEWAY_RATE_LIMIT, 10)

const gateway = new Bottleneck({
  minTime: Math.ceil((60 / rateLimit) * 1000),
})

export const getIpfsData = async ipfsHash => {
  const response = await gateway.schedule(() =>
    fetch(`${gatewayUrl}/${ipfsHash}`),
  )
  if (response.status !== 200) {
    throw new Error(`Unable to fetch IPFS data for ${ipfsHash}`)
  }
  const data = await response.json()
  return data
}

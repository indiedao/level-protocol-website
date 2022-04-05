import pinataSDK from '@pinata/sdk'
import Bottleneck from 'bottleneck'

const rateLimit = parseInt(process.env.PINATA_PIN_RATE_LIMIT, 10)

const pinata = pinataSDK(
  process.env.PINATA_PUBLIC_API_KEY,
  process.env.PINATA_PRIVATE_API_KEY,
)

const rateLimitedPinning = new Bottleneck({
  minTime: Math.ceil((60 / rateLimit) * 1000),
})

export const pinJSONToIPFS = async data =>
  rateLimitedPinning.schedule(() => pinata.pinJSONToIPFS(data))

export default pinata

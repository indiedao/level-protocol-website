import pinataSDK from '@pinata/sdk'

const pinata = pinataSDK(
  process.env.PINATA_PUBLIC_API_KEY,
  process.env.PINATA_PRIVATE_API_KEY,
)

export default pinata

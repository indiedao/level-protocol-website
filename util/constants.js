import { ethers } from 'ethers'

const networkId = process.env.NEXT_PUBLIC_NETWORK_ID
const networkName = ethers.providers.getNetwork(Number(networkId)).name

export const LvlV1Address = process.env.NEXT_PUBLIC_LVL_V1_CONTRACT_ADDRESS
export const Network = {
  id: Number(networkId),
  hexId: `0x${Number(networkId).toString(16)}`,
  name: networkName === 'homestead' ? 'mainnet' : networkName,
}
export const HTTPRPC = `https://eth-${Network.name}.alchemyapi.io/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`
export const WSRPC = `ws://eth-${Network.name}.alchemyapi.io/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`

export const AlchemyApiKey = process.env.NEXT_PUBLIC_ALCHEMY_KEY

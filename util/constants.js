import { ethers } from 'ethers'

const networkId = process.env.NEXT_PUBLIC_NETWORK_ID

export const RPCPath = process.env.NEXT_PUBLIC_RPC_PATH
export const LvlV1Address = process.env.NEXT_PUBLIC_LVL_V1_CONTRACT_ADDRESS
export const InfuraId = process.env.NEXT_PUBLIC_INFURA_ID
export const Network = {
  id: Number(networkId),
  hexId: `0x${Number(networkId).toString(16)}`,
  name: ethers.providers.getNetwork(Number(networkId)).name,
}

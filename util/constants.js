import { ethers } from 'ethers'

export const LvlV1Address = process.env.NEXT_PUBLIC_LVL_V1_CONTRACT_ADDRESS
export const InfuraId = process.env.NEXT_PUBLIC_INFURA_ID
export const Network = {
  id: Number(process.env.NEXT_PUBLIC_NETWORK_ID),
  hexId: `0x${Number(process.env.NEXT_PUBLIC_NETWORK_ID).toString(16)}`,
  name: ethers.providers.getNetwork(Number(process.env.NEXT_PUBLIC_NETWORK_ID))
    .name,
}

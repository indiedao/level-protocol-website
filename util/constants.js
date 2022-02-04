export const LvlV1Address = process.env.NEXT_PUBLIC_LVL_V1_CONTRACT_ADDRESS
export const InfuraId = process.env.NEXT_PUBLIC_INFURA_ID
export const NetworkId = process.env.NEXT_PUBLIC_NETWORK_ID

const NETWORK_NAMES = {
  '0x1': 'Mainnet',
  '0x4': 'Rinkeby',
}
export const NetworkName = NETWORK_NAMES[process.env.NEXT_PUBLIC_NETWORK_ID]

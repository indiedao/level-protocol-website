import { ethers } from 'ethers'
import LvlABI from '../abi/contracts/LvlV1.sol/LvlV1.json'
import NftABI from '../abi/contracts/Nft.sol/Nft.json'
import { Network, AlchemyApiKey, LvlV1Address } from './constants'

// Setup web3 contract:
export const provider = new ethers.providers.AlchemyProvider(
  Network.id,
  AlchemyApiKey,
)
export const nftContract = new ethers.Contract(LvlV1Address, LvlABI, provider)
export function getNftContract(address) {
  return new ethers.Contract(address, NftABI, provider)
}

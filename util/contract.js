import { ethers } from 'ethers'
import LvlABI from '../abi/contracts/LvlV1.sol/LvlV1.json'
import { NETWORK_NAME, API_KEY, LvlV1Address } from './constants'

// Setup web3 contract:
const provider = new ethers.providers.AlchemyProvider(NETWORK_NAME, API_KEY)
const contract = new ethers.Contract(LvlV1Address, LvlABI, provider)

export default contract

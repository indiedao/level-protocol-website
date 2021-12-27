const { expect } = require('chai')
const { ethers } = require('hardhat')

let owner
let contract

describe('Core', () => {
  beforeEach(async () => {
    const Contract = await ethers.getContractFactory('LvlV1')
    contract = await Contract.deploy()
    await contract.deployed()
    await ethers.getSigners()
    const [o] = await ethers.getSigners()
    owner = o
  })

  it('should support multicall', async () => {
    // Primary use case: batch updates of one or few skillSets for many addresses:

    const calls = []
    const accounts = []
    const NUMBER_OF_ACCOUNTS = 100
    const NUMBER_OF_SKILLSETS = 1

    for (let i = 0; i < NUMBER_OF_SKILLSETS; i += 1) {
      // Register skillSet i:
      // eslint-disable-next-line no-await-in-loop
      await contract.registerSkillSet(owner.address)
    }

    // Setup 1000 community member addresses:
    for (let h = 0; h < NUMBER_OF_ACCOUNTS; h += 1) {
      accounts.push(ethers.Wallet.createRandom())
      const skillSets = []
      const values = []
      // Set 2 unique skillSet values for each address:
      for (let i = 0; i < NUMBER_OF_SKILLSETS; i += 1) {
        skillSets[i] = i
        values[i] = `0x${[...Array(64)] // 64 nibbles => uint256
          .map(() => Math.floor(Math.random() * 16).toString(16))
          .join('')}`
      }
      calls.push({
        address: accounts[h].address,
        skillSets,
        values,
      })
    }

    // Encode call data:
    const encodedCalls = calls.map(call =>
      contract.interface.encodeFunctionData('setSkillSets', [
        call.address,
        call.skillSets,
        call.values,
      ]),
    )

    // Multicall:
    await contract.multicall(encodedCalls)

    // Verify each value was stored in the correct skill slot:
    for (let h = 0; h < NUMBER_OF_ACCOUNTS; h += 1) {
      for (let i = 0; i < NUMBER_OF_SKILLSETS; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        const value = await contract.skillSetValueOf(accounts[h].address, i)
        expect(value).to.equal(calls[h].values[i])
      }
    }
  })
})

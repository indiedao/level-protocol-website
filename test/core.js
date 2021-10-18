const { expect } = require('chai')
const { ethers } = require('hardhat')

let contract, owner, addr1, addr2, addr3

describe('Core', function () {
  beforeEach(async () => {
    const Contract = await ethers.getContractFactory('Level')
    contract = await Contract.deploy()
    await contract.deployed()
    const [o, a1, a2, a3] = await ethers.getSigners()
    owner = o
    addr1 = a1
    addr2 = a2
    addr3 = a3
  })

  it('should support multicall', async function () {
    // Primary use case: batch updates of one or few skillSets for many addresses:

    const calls = []
    const accounts = []
    const NUMBER_OF_ACCOUNTS = 100
    const NUMBER_OF_SKILLSETS = 1
    // Setup 1000 community member addresses:
    for (var h = 0; h < NUMBER_OF_ACCOUNTS; h++) {
      accounts.push(ethers.Wallet.createRandom())
      const skillSets = []
      const values = []
      // Set 2 unique skillSet values for each address:
      for (var i = 0; i < NUMBER_OF_SKILLSETS; i++) {
        skillSets[i] = i
        values[i] =
          '0x' +
          [...Array(64)] // 64 nibbles => uint256
            .map(() => Math.floor(Math.random() * 16).toString(16))
            .join('')
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
    for (var h = 0; h < NUMBER_OF_ACCOUNTS; h++) {
      for (var i = 0; i < NUMBER_OF_SKILLSETS; i++) {
        const value = await contract.skillSetValueOf(accounts[h].address, i)
        expect(value).to.equal(calls[h].values[i])
      }
    }
  })
})

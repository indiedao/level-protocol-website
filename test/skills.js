import { expect } from 'chai'
import { ethers } from 'hardhat'

let contract
let addr1

describe('Skills', () => {
  beforeEach(async () => {
    const Contract = await ethers.getContractFactory('Level')
    contract = await Contract.deploy()
    await contract.deployed()
    const [, a1] = await ethers.getSigners()
    addr1 = a1
  })

  it('should be settable for an address', async () => {
    // Set skillSet 0, skill 3:
    await contract.setSkill(addr1.address, 0, 3, 42)
    const value = await contract.getSkill(addr1.address, 0, 3)
    expect(value).to.equal(42)
    // Set skillSet 23, skill 1:
    await contract.setSkill(addr1.address, 23, 1, 123)
    const value2 = await contract.getSkill(addr1.address, 23, 1)
    expect(value2).to.equal(123)
  })

  it('should be settable for an address in bulk (by looping)', async () => {
    // Create a random skill value for each slot:
    const skills = []
    const values = []
    for (let i = 0; i < 32; i += 1) {
      skills[i] = i
      values[i] = Math.floor(Math.random() * 255)
    }

    // Set skills using a loop that calls setSkill internally:
    await contract.setSkills(addr1.address, 0, skills, values)

    // Verify each value was stored in the correct skill slot:
    const results = []
    for (let i = 0; i < 32; i += 1) {
      results.push(contract.getSkill(addr1.address, 0, i))
    }

    await Promise.all(results)

    for (let i = 0; i < 32; i += 1) {
      expect(results[i]).to.equal(values[i])
    }
  })
})

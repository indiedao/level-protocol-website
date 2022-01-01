const { expect } = require('chai')
const { ethers } = require('hardhat')

let contract
let owner
let addr1

describe('Skills', () => {
  beforeEach(async () => {
    const Contract = await ethers.getContractFactory('LvlV1')
    contract = await Contract.deploy()
    await contract.deployed()
    const [o, a1] = await ethers.getSigners()
    owner = o
    addr1 = a1
  })

  it('should be settable for an address', async () => {
    // Register skillSet 0, 1, 2:
    await contract.registerSkillSet(owner.address)
    await contract.registerSkillSet(owner.address)
    await contract.registerSkillSet(owner.address)
    // Set skillSet 0, skill 3:
    await contract.setSkill(addr1.address, 0, 3, 42)
    const value = await contract.getSkill(addr1.address, 0, 3)
    expect(value).to.equal(42)
    // Set skillSet 2, skill 1:
    await contract.setSkill(addr1.address, 2, 1, 123)
    const value2 = await contract.getSkill(addr1.address, 2, 1)
    expect(value2).to.equal(123)
  })

  it('should not allow addresses to set a skill they don’t own', async () => {
    // Try to set skillSet 401, skill 3:
    await expect(
      contract.setSkill(addr1.address, 401, 3, 42),
    ).to.be.revertedWith('Auth: caller is not the owner of this skillset')
  })

  it('should be settable for an address in bulk (by looping)', async () => {
    // Register skillSet 0:
    await contract.registerSkillSet(owner.address)
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
    for (let i = 0; i < 32; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const result = await contract.getSkill(addr1.address, 0, i)
      expect(result).to.equal(values[i])
    }
  })
})

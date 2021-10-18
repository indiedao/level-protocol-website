const { expect } = require('chai')
const { ethers } = require('hardhat')

let contract, owner, addr1, addr2, addr3

describe('Skills', function () {
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

  it('should be settable for an address', async function () {
    // Set skillSet 0, skill 3:
    await contract.setSkill(addr1.address, 0, 3, 42)
    const value = await contract.getSkill(addr1.address, 0, 3)
    expect(value).to.equal(42)
    // Set skillSet 23, skill 1:
    await contract.setSkill(addr1.address, 23, 1, 123)
    const value2 = await contract.getSkill(addr1.address, 23, 1)
    expect(value2).to.equal(123)
  })
  it('should be settable for an address in bulk (by looping)', async function () {
    // Create a random skill value for each slot:
    const skills = []
    const values = []
    for (var i = 0; i < 32; i++) {
      skills[i] = i
      values[i] = Math.floor(Math.random() * 255)
    }

    // Set skills using a loop that calls setSkill internally:
    await contract.setSkills(addr1.address, 0, skills, values)

    // Verify each value was stored in the correct skill slot:
    for (var i = 0; i < 32; i++) {
      const value = await contract.getSkill(addr1.address, 0, i)
      expect(value).to.equal(values[i])
    }
  })
})

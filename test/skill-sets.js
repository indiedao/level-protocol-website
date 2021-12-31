import { expect } from 'chai'
import { ethers } from 'hardhat'

let contract
let owner
let addr1
let addr2

describe('Skillsets', () => {
  beforeEach(async () => {
    const Contract = await ethers.getContractFactory('Level')
    contract = await Contract.deploy()
    await contract.deployed()
    const [o, a1, a2] = await ethers.getSigners()
    owner = o
    addr1 = a1
    addr2 = a2
  })

  it('should be registerable', async () => {
    // Register first skillset (0)
    await contract.connect(addr1).registerSkillSet(addr1.address)
    owner = await contract.ownerBySkillSet(0)
    expect(owner).to.equal(addr1.address)
  })

  it('should be enumerable by owner', async () => {
    // Register skillets (addr1 => 0,2 / addr2 => 1,3):
    await contract.connect(addr1).registerSkillSet(addr1.address)
    await contract.connect(addr2).registerSkillSet(addr2.address)
    await contract.connect(addr1).registerSkillSet(addr1.address)
    await contract.connect(addr2).registerSkillSet(addr2.address)
    const addr1SkillSets = await contract.skillSetsByOwner(addr1.address)
    const addr2SkillSets = await contract.skillSetsByOwner(addr2.address)
    expect(Number(addr1SkillSets[0])).to.equal(0)
    expect(Number(addr1SkillSets[1])).to.equal(2)
    expect(Number(addr2SkillSets[0])).to.equal(1)
    expect(Number(addr2SkillSets[1])).to.equal(3)
  })

  it('should be settable for an address', async () => {
    // Set skillSet 0, skill 3=42, skill 13=69, skill 24=123:
    // 0x00000000000000xx00000000000000000000xx000000000000000000xx000000;
    //                 ^24(123 => 0x7b)      ^13(69 => 0x45)     ^3(42 => 0x2a)
    const skillSet =
      '0x000000000000007b00000000000000000000450000000000000000002a000000'
    await contract.setSkillSet(addr1.address, 0, skillSet)
    const value3 = await contract.getSkill(addr1.address, 0, 3)
    expect(value3).to.equal(42)
    const value13 = await contract.getSkill(addr1.address, 0, 13)
    expect(value13).to.equal(69)
    const value24 = await contract.getSkill(addr1.address, 0, 24)
    expect(value24).to.equal(123)
  })

  it('should be settable for an address in bulk', async () => {
    // Create 100 random skillSet values to update:
    const skillSets = []
    const values = []
    for (let i = 0; i < 100; i += 1) {
      skillSets[i] = i
      values[i] = `0x${[...Array(64)] // 64 nibbles => uint256
        .map(() => Math.floor(Math.random() * 16).toString(16))
        .join('')}`
    }

    await contract.setSkillSets(addr1.address, skillSets, values)

    // Verify each value was stored in the correct skill slot:
    const results = []
    for (let i = 0; i < 32; i += 1) {
      results.push(contract.skillSetValueOf(addr1.address, i))
    }

    await Promise.all(results)

    for (let i = 0; i < 32; i += 1) {
      expect(results[i]).to.equal(values[i])
    }
  })
})

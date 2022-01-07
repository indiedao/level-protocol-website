const { expect } = require('chai')
const { ethers } = require('hardhat')

let contract
let addr1

describe('Off-Chain Metadata', () => {
  beforeEach(async () => {
    const Contract = await ethers.getContractFactory('LvlV1')
    contract = await Contract.deploy()
    await contract.deployed()
    const [, a1] = await ethers.getSigners()
    addr1 = a1
  })

  describe('offChainURI', () => {
    it('should be configurable by owner', async () => {
      await contract
        .connect(addr1)
        .setOffChainURI(
          'ipfs://QmQC8pH4xEzLAPreuYcokifrtxTfeD7v7buCywHAF3B7cY/lvl/',
        )
      const offChainURI = await contract.offChainURIByOwner(addr1.address)
      expect(offChainURI).to.equal(
        'ipfs://QmQC8pH4xEzLAPreuYcokifrtxTfeD7v7buCywHAF3B7cY/lvl/',
      )
      await contract.connect(addr1).setOffChainURI('ipfs://newhash/lvl/')
      const updatedOffChainURI = await contract.offChainURIByOwner(
        addr1.address,
      )
      expect(updatedOffChainURI).to.equal('ipfs://newhash/lvl/')
    })
  })
})

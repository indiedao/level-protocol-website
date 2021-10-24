const { expect } = require('chai')
const { ethers } = require('hardhat')

let contract, owner, addr1, addr2, addr3

describe('Off-Chain Metadata', function () {
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

  describe('offChainURI', function () {
    it('should be configurable by owner', async function () {
      await contract
        .connect(addr1)
        .setOffChainURI(
          'ipfs://QmQC8pH4xEzLAPreuYcokifrtxTfeD7v7buCywHAF3B7cY/level/',
        )
      const offChainURI = await contract.offChainURIByOwner(addr1.address)
      expect(offChainURI).to.equal(
        'ipfs://QmQC8pH4xEzLAPreuYcokifrtxTfeD7v7buCywHAF3B7cY/level/',
      )
      await contract.connect(addr1).setOffChainURI('ipfs://newhash/level/')
      const updatedOffChainURI = await contract.offChainURIByOwner(
        addr1.address,
      )
      expect(updatedOffChainURI).to.equal('ipfs://newhash/level/')
    })
  })
})

const { expect } = require('chai')
const { ethers } = require('hardhat')

let contract
let addr1
let addr2
let addr3

describe('(ERC-721) $LVL token', () => {
  beforeEach(async () => {
    const Contract = await ethers.getContractFactory('LvlV1')
    contract = await Contract.deploy()
    await contract.deployed()
    const [, a1, a2, a3] = await ethers.getSigners()
    addr1 = a1
    addr2 = a2
    addr3 = a3
  })

  it('should be initialized with a name and symbol', async () => {
    const name = await contract.name()
    const symbol = await contract.symbol()
    expect(name).to.equal('Lvl')
    expect(symbol).to.equal('LVL')
  })

  describe('minting', () => {
    it('should start at token id 0, and increment each mint', async () => {
      await contract.connect(addr1).mint()
      const owner1 = await contract.ownerOf(0)
      expect(owner1).to.equal(addr1.address)
      await contract.connect(addr2).mint()
      const owner2 = await contract.ownerOf(1)
      expect(owner2).to.equal(addr2.address)
      await contract.connect(addr3).mint()
      const owner3 = await contract.ownerOf(2)
      expect(owner3).to.equal(addr3.address)
    })

    it('should only allow one token per address', async () => {
      await contract.connect(addr1).mint()
      await expect(contract.connect(addr1).mint()).to.be.revertedWith(
        'Address can only have one LVL token!',
      )
    })

    it('should only allow transfer during mint', async () => {
      await contract.connect(addr1).mint()
      await expect(
        contract.connect(addr1).transferFrom(addr1.address, addr2.address, 0),
      ).to.be.revertedWith('Token can only be transferred during minting!')
    })
  })

  describe('enumerability', () => {
    describe('tokenOfOwner', () => {
      it('should show which token id belongs to an address', async () => {
        await contract.connect(addr1).mint()
        const tokenId = await contract.tokenOfOwner(addr1.address)
        expect(tokenId).to.equal(0)
        await contract.connect(addr2).mint()
        const tokenId2 = await contract.tokenOfOwner(addr2.address)
        expect(tokenId2).to.equal(1)
      })

      it.skip('should require that owner address owns a token', async () => {
        await expect(contract.tokenOfOwner(addr1.address)).to.be.revertedWith(
          'Address does not own a token!',
        )
      })

      it('should show which address owns a token', async () => {
        await contract.connect(addr1).mint()
        const owner1 = await contract.ownerOf(0)
        expect(owner1).to.equal(addr1.address)
        await contract.connect(addr2).mint()
        const owner2 = await contract.ownerOf(1)
        expect(owner2).to.equal(addr2.address)
      })
    })
  })

  describe('metadata', () => {
    it('should initialize base URI to the correct gateway', async () => {
      await contract.mint()
      const uri = await contract.tokenURI(0)
      expect(uri).to.equal('https://lvl.2c.io/api/token/0')
    })

    it('should allow owner to change base URI', async () => {
      // Mint token:
      await contract.mint()
      const uri = await contract.tokenURI(0)
      expect(uri).to.equal('https://lvl.2c.io/api/token/0')
      // Change base URI:
      await contract.setBaseURI('https://newapi.2c.io/api/token/')
      const newUri = await contract.tokenURI(0)
      expect(newUri).to.equal('https://newapi.2c.io/api/token/0')
    })

    it('should not allow non-owners to set base URI', async () => {
      await expect(
        contract.connect(addr1).setBaseURI('https://newapi.2c.io/api/token/'),
      ).to.be.revertedWith('Ownable: caller is not the owner')
    })
  })
})

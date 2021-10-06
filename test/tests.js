const { expect } = require('chai')
const { ethers } = require('hardhat')

let contract, owner, addr1, addr2, addr3

describe('$LEVEL', function () {
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

  describe('ERC-721 token', function () {
    it('should be initialized with a name and symbol', async function () {
      const name = await contract.name()
      const symbol = await contract.symbol()
      expect(name).to.equal('Level')
      expect(symbol).to.equal('LEVEL')
    })

    describe('minting', function () {
      it('should start at token id 0, and increment each mint', async function () {
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
      it('should only allow one token per address', async function () {
        await contract.connect(addr1).mint()
        await expect(contract.connect(addr1).mint()).to.be.revertedWith(
          'Address can only have one LEVEL token!',
        )
      })
      it('should only allow transfer during mint', async function () {
        await contract.connect(addr1).mint()
        await expect(
          contract.connect(addr1).transferFrom(addr1.address, addr2.address, 0),
        ).to.be.revertedWith('Token can only be transferred during minting!')
      })
    })

    describe('enumerability', function () {
      describe('tokenOfOwner', function () {
        it('should show which token id belongs to an address', async function () {
          await contract.connect(addr1).mint()
          const tokenId = await contract.tokenOfOwner(addr1.address)
          expect(tokenId).to.equal(0)
          await contract.connect(addr2).mint()
          const tokenId2 = await contract.tokenOfOwner(addr2.address)
          expect(tokenId2).to.equal(1)
        })
        it('should require that owner address owns a token', async function () {
          await expect(contract.tokenOfOwner(addr1.address)).to.be.revertedWith(
            'Address does not own a token!',
          )
        })
        it('should show which address owns a token', async function () {
          await contract.connect(addr1).mint()
          const owner1 = await contract.ownerOf(0)
          expect(owner1).to.equal(addr1.address)
          await contract.connect(addr2).mint()
          const owner2 = await contract.ownerOf(1)
          expect(owner2).to.equal(addr2.address)
        })
      })
    })

    describe('metadata', function () {
      it('should initialize base URI to the correct gateway', async function () {
        await contract.mint()
        const uri = await contract.tokenURI(0)
        expect(uri).to.equal('https://level.2c.io/api/level/token/0')
      })
      it('should allow owner to change base URI', async function () {
        // Mint token:
        await contract.mint()
        const uri = await contract.tokenURI(0)
        expect(uri).to.equal('https://level.2c.io/api/level/token/0')
        // Change base URI:
        await contract.setBaseURI('https://newapi.2c.io/api/level/token/')
        const newUri = await contract.tokenURI(0)
        expect(newUri).to.equal('https://newapi.2c.io/api/level/token/0')
      })
      it('should not allow non-owners to set base URI', async function () {
        await expect(
          contract.connect(addr1).setBaseURI('https://newapi.2c.io/api/token/'),
        ).to.be.revertedWith('Ownable: caller is not the owner')
      })
    })
  })
})

describe.only('$REP', function () {
  beforeEach(async () => {
    const Contract = await ethers.getContractFactory('Rep')
    contract = await Contract.deploy()
    await contract.deployed()
    const [o, a1, a2, a3] = await ethers.getSigners()
    owner = o
    addr1 = a1
    addr2 = a2
    addr3 = a3
  })

  describe('ERC-1155 token', function () {
    it('should be initialized with a base URI', async function () {
      const uri = await contract.uri(0)
      expect(uri).to.equal('https://level.2c.io/api/rep/token/{id}')
    })
  })

  describe('minting', function () {
    it('should allow minting a token to a single address', async function () {
      await contract.mint(addr1.address, 0, 5, '0x')
      const balance = await contract.balanceOf(addr1.address, 0)
      expect(balance).to.equal(5)
    })

    it('should allow batch minting a token to a single address', async function () {
      const idsToMint = []
      const valuesToMint = []
      // Mint 100 values for a single address:
      for (var i = 0; i < 100; i++) {
        idsToMint.push(i)
        valuesToMint.push(100 + i)
      }
      await contract.mintBatch(addr1.address, idsToMint, valuesToMint, '0x')
      // Check the first set of balance:
      const balances = await contract.balanceOfBatch(
        [addr1.address, addr1.address, addr1.address],
        [0, 1, 2],
      )
      expect(Number(balances[0])).to.equal(100)
      expect(Number(balances[1])).to.equal(101)
      expect(Number(balances[2])).to.equal(102)
    })
  })
})

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

  describe('Metadata', function () {
    describe('baseURI', function () {
      it('should be writable and readable by an owner', async function () {
        await contract
          .connect(addr1)
          .setMetadataBaseURI(
            'ipfs://QmQC8pH4xEzLAPreuYcokifrtxTfeD7v7buCywHAF3B7cY/level',
          )
        const baseURI = await contract.metadataBaseURIByOwner(addr1.address)
        expect(baseURI).to.equal(
          'ipfs://QmQC8pH4xEzLAPreuYcokifrtxTfeD7v7buCywHAF3B7cY/level',
        )
        await contract.connect(addr1).setMetadataBaseURI('ipfs://newhash/level')
        const updatedBaseURI = await contract.metadataBaseURIByOwner(
          addr1.address,
        )
        expect(updatedBaseURI).to.equal('ipfs://newhash/level')
      })
    })
  })

  describe('Skillsets', function () {
    it('should be registerable', async function () {
      // Register first skillset (0)
      await contract.connect(addr1).registerSkillSet(addr1.address)
      const owner = await contract.ownerBySkillSet(0)
      expect(owner).to.equal(addr1.address)
    })
    it('should be enumerable by owner', async function () {
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
  })

  describe('Skills', function () {
    describe('skills', function () {
      it('should be settable individually', async function () {
        // Set skillSet 0, skill 3:
        await contract.setSkill(addr1.address, 0, 3, 42)
        const value = await contract.getSkill(addr1.address, 0, 3)
        expect(value).to.equal(42)
        // Set skillSet 23, skill 1:
        await contract.setSkill(addr1.address, 23, 1, 123)
        const value2 = await contract.getSkill(addr1.address, 23, 1)
        expect(value2).to.equal(123)
      })
      it('should be settable in bulk by looping', async function () {
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
      it('should be settable in bulk by setting whole skillSet value', async function () {
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
    })
    it('should be settable in bulk', async function () {
      // Create 100 skillSets to update:
      const skillSets = []
      const values = []
      for (var i = 0; i < 100; i++) {
        skillSets[i] = i
        values[i] =
          '0x' +
          [...Array(64)] // 64 nibbles => uint256
            .map(() => Math.floor(Math.random() * 16).toString(16))
            .join('')
      }

      await contract.setSkillSets(addr1.address, skillSets, values)

      // Verify each value was stored in the correct skill slot:
      for (var i = 0; i < 32; i++) {
        const value = await contract.skillSetValueOf(addr1.address, i)
        expect(value).to.equal(values[i])
      }
    })
  })
})

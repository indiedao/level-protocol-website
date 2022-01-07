require('@nomiclabs/hardhat-waffle')
require('@nomiclabs/hardhat-etherscan')
require('hardhat-gas-reporter')

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners()

  for (const account of accounts) {
    console.log(account.address)
  }
})

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const rinkebyGatewayUrl = process.env.NODE_ENV === 'test'
  ? 'https://rinkeby.infura.io/v3/token'
  : process.env.RINKEBY_GATEWAY

const mainnetGatewayUrl = process.env.NODE_ENV === 'test'
  ? 'https://mainnet.infura.io/v3/token'
  : process.env.MAINNET_GATEWAY

const deployerPrivateKey = process.env.NODE_ENV === 'test'
  ? '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff90'
  : process.env.DEPLOYER_PRIVATE_KEY

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    compilers: [
      {
        version: '0.8.0',
      },
    ],
  },
  networks: {
    rinkeby: {
      url: rinkebyGatewayUrl,
      accounts: [deployerPrivateKey],
      gasPrice: 1000000000, // 1gwei
    },
    mainnet: {
      url: mainnetGatewayUrl,
      accounts: [deployerPrivateKey],
      gasPrice: 1000000000, // 1gwei
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
}

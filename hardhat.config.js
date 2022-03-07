require('@nomiclabs/hardhat-waffle')
require('@nomiclabs/hardhat-etherscan')
require('hardhat-gas-reporter')
require('hardhat-abi-exporter')

const deployerPrivateKey =
  process.env.NODE_ENV === 'test'
    ? '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff90'
    : process.env.DEPLOYER_PRIVATE_KEY

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
      url: `https://${process.env.RINKEBY_RPC_PATH}`,
      socket: `wss://${process.env.RINKEBY_RPC_PATH}`,
      accounts: [deployerPrivateKey],
      gasPrice: 1 * 1000000000, // gwei
    },
    mainnet: {
      url: `https://${process.env.MAINNET_RPC_PATH}`,
      socket: `wss://${process.env.MAINNET_RPC_PATH}`,
      accounts: [deployerPrivateKey],
      gasPrice: 1 * 1000000000, // gwei
    },
  },
  etherscan: {
    apiKey: {
      mainnet: process.env.ETHERSCAN_API_KEY,
      rinkeby: process.env.ETHERSCAN_API_KEY,
    },
  },
}

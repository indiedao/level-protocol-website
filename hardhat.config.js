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
      url: process.env.RINKEBY_GATEWAY,
      accounts: [process.env.DEPLOYER_PRIVATE_KEY],
      gasPrice: 1000000000, // 1gwei
    },
    mainnet: {
      url: process.env.MAINNET_GATEWAY,
      accounts: [process.env.DEPLOYER_PRIVATE_KEY],
      gasPrice: 1000000000, // 1gwei
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
}

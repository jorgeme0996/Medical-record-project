require("@nomicfoundation/hardhat-toolbox");
const { PrivateKey, PolygonScanApiKey, TestNetRPC } = require('./config/constants')

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    mumbai: {
      url: TestNetRPC,
      accounts: [PrivateKey]
    }
  },
  etherscan: {
    apiKey: PolygonScanApiKey
  }
};

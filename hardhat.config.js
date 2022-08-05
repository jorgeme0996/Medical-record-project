require("@nomicfoundation/hardhat-toolbox");
const { PrivateKey, PolygonScanApiKey, RPCUrl } = require('./config/constants')

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    mumbai: {
      url: RPCUrl,
      accounts: [PrivateKey]
    }
  },
  etherscan: {
    apiKey: PolygonScanApiKey
  }
};

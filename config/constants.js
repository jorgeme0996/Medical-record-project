require('dotenv').config()

const TestNetRPC=process.env.TESTNET_RPC_URL
const PrivateKey=process.env.PIVATE_KEY
const PolygonScanApiKey=process.env.POLYGONSCAN_API_KEY
const DefenderKey=process.env.DEFENDER_KEY
const DefenderSecret=process.env.DEFENDER_SECRET
const AlquemyApiKey=process.env.ALQUEMY_API_KEY

module.exports = {
    TestNetRPC,
    PrivateKey,
    PolygonScanApiKey,
    DefenderKey,
    DefenderSecret,
    AlquemyApiKey
}

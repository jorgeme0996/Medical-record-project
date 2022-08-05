//const hre = require('hardhat');
const ethers = require('ethers');
const { getAbi } = require('../utils/getAbi');
const { AlquemyApiKey, PrivateKey, AddressContract } = require('../config/constants');

// The path to the contract ABI
const ABI_FILE_PATH = 'artifacts/contracts/MedicalRecord.sol/MedicalRecord.json';
// The address from the deployed smart contract
const DEPLOYED_CONTRACT_ADDRESS = AddressContract;

const getContract = async () => {
    const provider = new ethers.providers.AlchemyProvider(
        'maticmum',
        AlquemyApiKey
    );
    const abi = await getAbi(ABI_FILE_PATH);
    const signer = new ethers.Wallet(PrivateKey, provider);
    const contract = new ethers.Contract(DEPLOYED_CONTRACT_ADDRESS, abi, signer);
    return contract
}

module.exports = {
    getContract
}

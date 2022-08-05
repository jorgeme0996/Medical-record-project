const hre = require("hardhat");

const main = async () => {
  try {
    const nftContrtactFactory = await hre.ethers.getContractFactory("MedicalRecord")
    const nftContract = await nftContrtactFactory.deploy()
    await nftContract.deployed()

    console.log("Contract deployed to:", nftContract.address);
    process.exit(0)
  } catch (error) {
    console.log(error);
    process.exit(1)
  }
}

main();

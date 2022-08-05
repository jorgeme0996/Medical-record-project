const fs = require('fs');
const fsPromises = fs.promises;

// load ABI from build artifacts
const getAbi = async (abiFilePath) => {
  const data = await fsPromises.readFile(abiFilePath, "utf8");
  const abi = JSON.parse(data)["abi"];
  //console.log(abi);
  return abi;
}

module.exports = {getAbi}

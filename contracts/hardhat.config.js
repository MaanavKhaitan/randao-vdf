/** @type import('hardhat/config').HardhatUserConfig */
// require('dotenv').config(); //all the key value pairs are being made available due to this lib
require('@nomiclabs/hardhat-ethers');

module.exports = {
  solidity: "0.8.19",
  networks: {
    goerli: {
      url: ``,
      accounts: [``],
      gasPrice: 35000000000,
    }
  }
};

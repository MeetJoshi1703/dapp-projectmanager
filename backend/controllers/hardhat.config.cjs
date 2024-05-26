/**
* @type import('hardhat/config').HardhatUserConfig
*/

require('dotenv').config();
require("@nomiclabs/hardhat-ethers");



module.exports = {
   solidity: "0.8.20",
   defaultNetwork: "sepolia",
   networks: {
      hardhat: {},
      sepolia: {
         url: 'https://eth-sepolia.g.alchemy.com/v2/6fLocbj8DSRCAXtC9TyXreCiTcgeR1HU',
         accounts: [`0x63c6cb449046dc5c1840ccf560a62c6e7eb836f2135fc7fea9d603f3807b950e`]
      }
   },
}
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    // Uncomment these lines to deploy to a test network
    localhost: {
      url: "http://127.0.0.1:8545/",
      accounts: [
        "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
      ], // Array of private keys
    },
    // ropsten: {
    //   url: "https://ropsten.infura.io/v3/your-infura-project-id",
    //   accounts: [privateKey1, privateKey2, ...] // Array of private keys
    // },
    // mainnet: {
    //   url: "https://mainnet.infura.io/v3/your-infura-project-id",
    //   accounts: [privateKey1, privateKey2, ...] // Array of private keys
    // },
  },
};

const HDWalletProvider = require('truffle-hdwallet-provider');
const teamsMnemonic = "exit better neutral theory speak fee crouch spirit mixture verb law symbol";


module.exports = {
 networks: {
  development: {
    provider: function() {
      return new HDWalletProvider(teamsMnemonic, "https://sandbox.truffleteams.com/56c1781e-4114-4bd0-a140-1f123620b410", 0, 10, false);
    },
    port: 443,
    network_id: "*"
  }
},
   compilers: {
    solc: {
      version: "0.4.25"
    }
  }
};

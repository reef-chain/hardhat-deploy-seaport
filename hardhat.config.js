require("dotenv").config();
require("@reef-chain/hardhat-reef");

module.exports = {
    defaultNetwork: process.env.DEFAULT_NETWORK || "reef_testnet",
    networks: {
        reef: {
          url: "ws://127.0.0.1:9944",
          scanUrl: "http://localhost:3002",
          seeds: {
            account1: process.env.MNEMONIC_LOCALHOST || "",
          }
        },
        reef_testnet: {
          url: "wss://rpc-testnet.reefscan.com/ws",
          scanUrl: "https://api-testnet.reefscan.com",
          seeds: {
            account1: process.env.MNEMONIC_TESTNET || "",
          },
        },
        reef_mainnet: {
          url: "wss://rpc.reefscan.com/ws",
          scanUrl: "https://api.reefscan.com",
          seeds: {
            account1: process.env.MNEMONIC_MAINNET || "",
          },
        },
    },
    solidity: {
        compilers: [
            {
              version: "0.8.17",
              settings: {
                optimizer: {
                  enabled: true, 
                  runs: 4_294_967_295,
                },
              },
            }
        ],
        overrides: {
          "contracts/conduit/Conduit.sol": {
            version: "0.8.14",
            settings: {
              optimizer: {
                enabled: true,
                runs: 1000000,
              },
            },
          },
          "contracts/conduit/ConduitController.sol": {
            version: "0.8.14",
            settings: {
              optimizer: {
                enabled: true,
                runs: 1000000,
              },
            },
          },
          "contracts/helpers/TransferHelper.sol": {
            version: "0.8.14",
            settings: {
              optimizer: {
                enabled: true,
                runs: 1000000,
              },
            },
          },
          "contracts/helpers/order-validator": {
            version: "0.8.17",
            settings: {
              optimizer: {
                enabled: true,
                runs: 1,
              },
            },
          },
        },
    },
};

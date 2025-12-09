import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const PRIVATE_KEY = process.env.WALLET_KEY ?? "";
const ACCOUNTS = PRIVATE_KEY ? [PRIVATE_KEY] : [];

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.23",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  defaultNetwork: "hardhat",
  networks: {
    "lisk-sepolia": {
      url: "https://rpc.sepolia-api.lisk.com",
      chainId: 4202,
      gasPrice: 1_000_000_000,
      accounts: ACCOUNTS,
    },
    lisk: {
      url: "https://rpc.api.lisk.com",
      chainId: 1135,
      gasPrice: 1_000_000_000,
      accounts: ACCOUNTS,
    },
  },
  etherscan: {
    apiKey: {
      "lisk-sepolia": "123",
      lisk: "123",
    },
    customChains: [
      {
        network: "lisk-sepolia",
        chainId: 4202,
        urls: {
          apiURL: "https://sepolia-blockscout.lisk.com/api",
          browserURL: "https://sepolia-blockscout.lisk.com",
        },
      },
      {
        network: "lisk",
        chainId: 1135,
        urls: {
          apiURL: "https://blockscout.lisk.com/api",
          browserURL: "https://blockscout.lisk.com",
        },
      },
    ],
  },
  sourcify: {
    enabled: false,
  },
};

export default config;

export const CONTRACT_ADDRESS = process.env.REACT_APP_NFT_CONTRACT_ADDRESS ?? "";
export const LISK_SEPOLIA_RPC = process.env.REACT_APP_LISK_SEPOLIA_RPC ?? "https://rpc.sepolia-api.lisk.com";

export const LISK_SEPOLIA_CHAIN = {
  chainId: "0x106a", // 4202
  chainName: "Lisk Sepolia",
  nativeCurrency: {
    name: "Lisk ETH",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: ["https://rpc.sepolia-api.lisk.com"],
  blockExplorerUrls: ["https://sepolia-blockscout.lisk.com"],
};

/* global BigInt */
import axios from 'axios';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, LISK_SEPOLIA_RPC } from '../config/contract';

const NFT_ABI = [
  'function currentTokenId() view returns (uint256)',
  'function tokenMetadata(uint256 tokenId) view returns ((string name,string description,string mediaURI), address)',
  'function tokensOfOwner(address owner) view returns ((string name,string description,string mediaURI)[], uint256[])',
  'function mint(address recipient,string name,string description,string mediaURI) returns (uint256)',
  'function burn(uint256 tokenId)',
  'function transferFrom(address from,address to,uint256 tokenId)'
];

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000/api';

const readProvider = new ethers.JsonRpcProvider(LISK_SEPOLIA_RPC);
let writeContract;

const getReadContract = () => {
  if (!CONTRACT_ADDRESS) {
    throw new Error('NFT contract address is not configured. Set REACT_APP_NFT_CONTRACT_ADDRESS.');
  }
  return new ethers.Contract(CONTRACT_ADDRESS, NFT_ABI, readProvider);
};

const ensureWriteContract = () => {
  if (!writeContract) {
    throw new Error('Connect your wallet on Lisk Sepolia to perform this action.');
  }
  return writeContract;
};

const normalizeToken = (tokenId, metadata, owner) => ({
  id: Number(tokenId),
  name: metadata.name,
  description: metadata.description,
  uri: metadata.mediaURI,
  image: metadata.mediaURI,
  owner
});

const api = {
  setSigner: (signer) => {
    if (signer && CONTRACT_ADDRESS) {
      writeContract = new ethers.Contract(CONTRACT_ADDRESS, NFT_ABI, signer);
    } else {
      writeContract = null;
    }
  },

  getContractAddress: () => CONTRACT_ADDRESS,

  getAllNFTs: async () => {
    const contract = getReadContract();
    const latestId = await contract.currentTokenId();
    const tokens = [];

    for (let tokenId = 1n; tokenId <= latestId; tokenId++) {
      try {
        const [metadata, owner] = await contract.tokenMetadata(tokenId);
        tokens.push(normalizeToken(tokenId, metadata, owner));
      } catch {
        // Skip burned tokens which revert
      }
    }
    return tokens;
  },

  getNFTsByOwner: async (ownerAddress) => {
    if (!ownerAddress) {
      return [];
    }
    const contract = getReadContract();
    try {
      const [metadataList, tokenIds] = await contract.tokensOfOwner(ownerAddress);
      return tokenIds.map((id, index) => normalizeToken(id, metadataList[index], ownerAddress));
    } catch (error) {
      console.error('Error fetching NFTs by owner:', error);
      return [];
    }
  },

  getNFT: async (nftId) => {
    const contract = getReadContract();
    const [metadata, owner] = await contract.tokenMetadata(BigInt(nftId));
    return normalizeToken(nftId, metadata, owner);
  },

  mintNFT: async (name, description, uri, ownerAddress) => {
    const contract = ensureWriteContract();
    const tx = await contract.mint(ownerAddress, name, description, uri);
    await tx.wait();
    return tx.hash;
  },

  transferNFT: async (nftId, senderAddress, recipientAddress) => {
    const contract = ensureWriteContract();
    const tx = await contract.transferFrom(senderAddress, recipientAddress, BigInt(nftId));
    await tx.wait();
    return tx.hash;
  },

  burnNFT: async (nftId) => {
    const contract = ensureWriteContract();
    const tx = await contract.burn(BigInt(nftId));
    await tx.wait();
    return tx.hash;
  },

  generateNFTContent: async (prompt) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/generate`, { prompt });
      return response.data;
    } catch (error) {
      console.error('Error generating NFT content:', error);
      throw error;
    }
  }
};

export default api;
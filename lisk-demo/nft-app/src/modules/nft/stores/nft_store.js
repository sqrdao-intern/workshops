const { BaseStore } = require('lisk-sdk');
const { nftSchema } = require('../schemas/nft_schema');

/**
 * @class NFTStore
 * @description Store for managing NFT data with secure operations and optimized queries
 * @extends BaseStore
 */
class NFTStore extends BaseStore {
  /**
   * @constructor
   * @param {Object} dataAccess - Data access layer provided by Lisk SDK
   */
  constructor(moduleName, storeIndex = 0) {
    super(moduleName, storeIndex);
    this.schema = nftSchema;
  }

  async getNFT(ctx, nftId) {
    if (!nftId) {
      throw new Error('NFT ID is required');
    }
    
    try {
      return await this.get(ctx, nftId);
    } catch (error) {
      if (error.name === 'NotFoundError') {
        return undefined;
      }
      throw error;
    }
  }

  async setNFT(ctx, nft) {
    if (!nft || !nft.id) {
      throw new Error('Invalid NFT: missing required fields');
    }
    
    await this.set(ctx, nft.id, nft);
  }

  async deleteNFT(ctx, nftId) {
    if (!nftId) {
      throw new Error('NFT ID is required for deletion');
    }
    
    await this.del(ctx, nftId);
  }

  async getAllNFTs(limit = 100, offset = 0) {
    const nfts = [];
    let count = 0;
    
    try {
      await this.iterate({}, (key, value) => {
        if (count >= offset && nfts.length < limit) {
          const decodedNFT = this.codec.decode(this.schema, value);
          nfts.push(decodedNFT);
        }
        count++;
        return true;
      });
      return nfts;
    } catch (error) {
      throw new Error(`Failed to retrieve NFTs: ${error.message}`);
    }
  }

  async getNFTsByOwner(ownerAddress, limit = 100, offset = 0) {
    if (!ownerAddress) {
      throw new Error('Owner address is required');
    }
    
    const nfts = [];
    let count = 0;
    
    try {
      // Create an index for owner lookups if it doesn't exist
      const indexExists = await this.hasIndex('by_owner');
      if (!indexExists) {
        await this.createIndex('by_owner', (key, value) => {
          const nft = this.codec.decode(this.schema, value);
          return nft.owner;
        });
      }
      
      // Use the index for efficient lookups
      await this.iterateWithPrefix('by_owner', ownerAddress, (key, value) => {
        if (count >= offset && nfts.length < limit) {
          const decodedNFT = this.codec.decode(this.schema, value);
          nfts.push(decodedNFT);
        }
        count++;
        return true;
      });
      
      return nfts;
    } catch (error) {
      // Fallback to the old method if index-based lookup fails
      const allNfts = [];
      await this.iterate({}, (key, value) => {
        const decodedNFT = this.codec.decode(this.schema, value);
        if (decodedNFT.owner.equals(ownerAddress)) {
          allNfts.push(decodedNFT);
        }
        return true;
      });
      
      return allNfts.slice(offset, offset + limit);
    }
  }
}

module.exports = NFTStore;
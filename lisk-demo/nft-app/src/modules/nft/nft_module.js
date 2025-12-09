/**
 * @module NFTModule
 * @description A secure module for managing Non-Fungible Tokens (NFTs) on the Lisk blockchain
 * @author Lisk Team
 * @version 1.0.0
 */

const { BaseModule, BaseEndpoint } = require('lisk-sdk');
const MintCommand = require('./commands/mint_command');
const BurnCommand = require('./commands/burn_command');
const TransferCommand = require('./commands/transfer_command');
const NFTStore = require('./stores/nft_store');

class NFTModule extends BaseModule {
  constructor() {
    super();

    this.stores.register(NFTStore, new NFTStore(this.name, 0));

    this._mintCommand = new MintCommand(this.stores, this.events);
    this._burnCommand = new BurnCommand(this.stores, this.events);
    this._transferCommand = new TransferCommand(this.stores, this.events);

    this.commands = [this._mintCommand, this._burnCommand, this._transferCommand];
    this.endpoint = new BaseEndpoint(this.stores, this.offchainStores);
  }

  get name() {
    return 'nft';
  }

  get id() {
    return 1000;
  }

  metadata() {
    return this.baseMetadata();
  }
}

module.exports = NFTModule;
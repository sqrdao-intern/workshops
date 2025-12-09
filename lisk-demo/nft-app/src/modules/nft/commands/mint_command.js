const { BaseCommand, VerifyStatus } = require('lisk-sdk');
const crypto = require('crypto');
const { mintCommandSchema } = require('../schemas/command_schemas');
const NFTStore = require('../stores/nft_store');

class MintCommand extends BaseCommand {
  constructor(stores, events) {
    super(stores, events);
    this.schema = mintCommandSchema;
  }

  async verify(context) {
    const { params } = context;

    if (!params.name || params.name.length > 100) {
      return {
        status: VerifyStatus.FAIL,
        error: new Error('Name is required and must be less than 100 characters'),
      };
    }

    if (!params.description || params.description.length > 1000) {
      return {
        status: VerifyStatus.FAIL,
        error: new Error('Description is required and must be less than 1000 characters'),
      };
    }

    if (!params.uri || params.uri.length > 200) {
      return {
        status: VerifyStatus.FAIL,
        error: new Error('URI is required and must be less than 200 characters'),
      };
    }

    return { status: VerifyStatus.OK };
  }

  async execute(context) {
    const { params, transaction, header } = context;
    const senderAddress = transaction.senderAddress;

    const nftId = crypto
      .createHash('sha256')
      .update(
        Buffer.concat([
          transaction.id,
          Buffer.from(header.height.toString()),
          Buffer.from(header.timestamp.toString()),
        ]),
      )
      .digest();

    const nft = {
      id: nftId,
      owner: senderAddress,
      name: params.name,
      description: params.description,
      uri: params.uri,
      createdAt: header.timestamp,
    };

    const nftStore = this.stores.get(NFTStore);
    await nftStore.setNFT(context, nft);
  }
}

module.exports = MintCommand;
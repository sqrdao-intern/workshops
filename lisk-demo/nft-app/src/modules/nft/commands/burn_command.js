const { BaseCommand, VerifyStatus } = require('lisk-sdk');
const { burnCommandSchema } = require('../schemas/command_schemas');
const NFTStore = require('../stores/nft_store');

class BurnCommand extends BaseCommand {
  constructor(stores, events) {
    super(stores, events);
    this.schema = burnCommandSchema;
  }

  async verify(context) {
    const { params } = context;

    if (!params.nftId || !(params.nftId instanceof Buffer) || params.nftId.length === 0) {
      return {
        status: VerifyStatus.FAIL,
        error: new Error('NFT ID is required for burn command'),
      };
    }

    return { status: VerifyStatus.OK };
  }

  async execute(context) {
    const { params, transaction } = context;
    const nftStore = this.stores.get(NFTStore);
    const nft = await nftStore.getNFT(context, params.nftId);

    if (!nft) {
      throw new Error('NFT does not exist');
    }

    if (!nft.owner.equals(transaction.senderAddress)) {
      throw new Error('Sender is not the owner of this NFT');
    }

    await nftStore.deleteNFT(context, params.nftId);
  }
}

module.exports = BurnCommand;
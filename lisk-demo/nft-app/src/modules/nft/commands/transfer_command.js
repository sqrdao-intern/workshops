const { BaseCommand, VerifyStatus } = require('lisk-sdk');
const { transferCommandSchema } = require('../schemas/command_schemas');
const NFTStore = require('../stores/nft_store');

class TransferCommand extends BaseCommand {
  constructor(stores, events) {
    super(stores, events);
    this.schema = transferCommandSchema;
  }

  async verify(context) {
    const { params, transaction } = context;

    if (!params.recipient || !(params.recipient instanceof Buffer) || params.recipient.length === 0) {
      return {
        status: VerifyStatus.FAIL,
        error: new Error('Recipient address is required'),
      };
    }

    if (params.recipient.equals(transaction.senderAddress)) {
      return {
        status: VerifyStatus.FAIL,
        error: new Error('Cannot transfer NFT to yourself'),
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

    nft.owner = params.recipient;
    await nftStore.setNFT(context, nft);
  }
}

module.exports = TransferCommand;
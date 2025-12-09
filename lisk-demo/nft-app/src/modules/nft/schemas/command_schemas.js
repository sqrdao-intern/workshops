const mintCommandSchema = {
  $id: 'lisk/nft/mint',
  type: 'object',
  required: ['name', 'description', 'uri'],
  properties: {
    name: {
      dataType: 'string',
      fieldNumber: 1,
    },
    description: {
      dataType: 'string',
      fieldNumber: 2,
    },
    uri: {
      dataType: 'string',
      fieldNumber: 3,
    }
  }
};

const burnCommandSchema = {
  $id: 'lisk/nft/burn',
  type: 'object',
  required: ['nftId'],
  properties: {
    nftId: {
      dataType: 'bytes',
      fieldNumber: 1,
    }
  }
};

const transferCommandSchema = {
  $id: 'lisk/nft/transfer',
  type: 'object',
  required: ['nftId', 'recipient'],
  properties: {
    nftId: {
      dataType: 'bytes',
      fieldNumber: 1,
    },
    recipient: {
      dataType: 'bytes',
      fieldNumber: 2,
    }
  }
};

module.exports = {
  mintCommandSchema,
  burnCommandSchema,
  transferCommandSchema
};
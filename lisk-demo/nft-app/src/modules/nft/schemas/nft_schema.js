const nftSchema = {
  $id: 'lisk/nft/nft',
  type: 'object',
  required: ['id', 'owner', 'name', 'description', 'uri'],
  properties: {
    id: {
      dataType: 'bytes',
      fieldNumber: 1,
    },
    owner: {
      dataType: 'bytes',
      fieldNumber: 2,
    },
    name: {
      dataType: 'string',
      fieldNumber: 3,
    },
    description: {
      dataType: 'string',
      fieldNumber: 4,
    },
    uri: {
      dataType: 'string',
      fieldNumber: 5,
    },
    createdAt: {
      dataType: 'uint32',
      fieldNumber: 6,
    }
  }
};

module.exports = { nftSchema };
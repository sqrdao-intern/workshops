const { Application, testing, utils } = require('lisk-sdk');
const { address: addressUtils } = require('@liskhq/lisk-cryptography');
const path = require('path');
const os = require('os');
const NFTModule = require('../src/modules/nft/nft_module');

const DEFAULT_CHAIN_ID = '04000001';

const normalizeGenesisAssets = (assets) =>
  assets.map((asset) => {
    const normalized = utils.objects.cloneDeep(asset);

    if (asset.module === 'token') {
      normalized.data.userSubstore = normalized.data.userSubstore.map((entry) => ({
        address: addressUtils.getAddressFromLisk32Address(entry.address),
        tokenID: Buffer.from(entry.tokenID, 'hex'),
        availableBalance: BigInt(entry.availableBalance),
        lockedBalances: entry.lockedBalances.map((lock) => ({
          module: lock.module,
          amount: BigInt(lock.amount),
        })),
      }));

      normalized.data.supplySubstore = normalized.data.supplySubstore.map((entry) => ({
        tokenID: Buffer.from(entry.tokenID, 'hex'),
        totalSupply: BigInt(entry.totalSupply),
      }));

      normalized.data.escrowSubstore = normalized.data.escrowSubstore.map((entry) => ({
        escrowChainID: Buffer.from(entry.escrowChainID ?? '', 'hex'),
        tokenID: Buffer.from(entry.tokenID, 'hex'),
        amount: BigInt(entry.amount ?? '0'),
      }));

      normalized.data.supportedTokensSubstore = normalized.data.supportedTokensSubstore.map((entry) => ({
        chainID: Buffer.from(entry.chainID, 'hex'),
        supportedTokenIDs: entry.supportedTokenIDs.map((id) => Buffer.from(id, 'hex')),
      }));
    }

    if (asset.module === 'pos') {
      normalized.data.validators = normalized.data.validators.map((validator) => ({
        ...validator,
        address: addressUtils.getAddressFromLisk32Address(validator.address),
        blsKey: Buffer.from(validator.blsKey, 'hex'),
        proofOfPossession: Buffer.from(validator.proofOfPossession, 'hex'),
        generatorKey: Buffer.from(validator.generatorKey, 'hex'),
      }));

      normalized.data.stakers = normalized.data.stakers.map((staker) => ({
        ...staker,
        address: addressUtils.getAddressFromLisk32Address(staker.address),
        sentStakes: staker.sentStakes.map((stake) => ({
          ...stake,
          validatorAddress: addressUtils.getAddressFromLisk32Address(stake.validatorAddress),
          amount: BigInt(stake.amount),
        })),
        pendingUnlocks: staker.pendingUnlocks.map((unlock) => ({
          ...unlock,
          validatorAddress: addressUtils.getAddressFromLisk32Address(unlock.validatorAddress),
          amount: BigInt(unlock.amount),
        })),
      }));

      normalized.data.genesisData.initValidators = normalized.data.genesisData.initValidators.map((val) =>
        addressUtils.getAddressFromLisk32Address(val),
      );
    }

    return normalized;
  });

const testnetConfig = utils.objects.mergeDeep({}, testing.fixtures.defaultConfig, {
  system: {
    version: '1.0.0',
    dataPath: path.join(os.homedir(), '.lisk', 'lisk-nft-testnet'),
    logLevel: 'info',
  },
  network: {
    seedPeers: [
      { ip: 'testnet.lisk.io', port: 7001 },
      { ip: 'testnet-seed-01.lisk.io', port: 7001 },
    ],
    port: 7001,
    host: '0.0.0.0',
    maxInboundConnections: 100,
    maxOutboundConnections: 100,
  },
  rpc: {
    modes: ['ws'],
    host: '0.0.0.0',
    port: 7887,
  },
  genesis: {
    chainID: DEFAULT_CHAIN_ID,
    blockTime: 10,
    bftBatchSize: 103,
    maxTransactionsSize: 15 * 1024,
    minimumCertifyHeight: 1,
  },
  transactionPool: {
    maxTransactions: 4096,
    maxTransactionsPerAccount: 64,
  },
});

testnetConfig.modules.nft = {};

testnetConfig.plugins = {};

testnetConfig.system.enableMetrics = false;

testnetConfig.legacy = testnetConfig.legacy || { sync: false, brackets: [] };

testnetConfig.generator = testnetConfig.generator || { keys: {} };

testnetConfig.genesis.block = testnetConfig.genesis.block || {};

async function deployToTestnet() {
  console.log('🚀 Starting Lisk NFT Testnet Deployment...');

  try {
    const { app } = Application.defaultApplication(testnetConfig, false);
    app.registerModule(new NFTModule());

    const genesisAssets = normalizeGenesisAssets(testing.fixtures.blockAssetsJSON);
    const genesisBlock = await app.generateGenesisBlock({
      assets: genesisAssets,
      chainID: Buffer.from(app.config.genesis.chainID, 'hex'),
    });

    app.config.genesis.block = {
      ...app.config.genesis.block,
      blob: genesisBlock.getBytes().toString('hex'),
    };

    console.log('✅ NFT Module registered successfully');
    console.log('📋 Configuration:');
    console.log('   - Network: Testnet');
    console.log('   - P2P Host:', app.config.network.host);
    console.log('   - P2P Port:', app.config.network.port);
    console.log('   - RPC Host:', app.config.rpc.host);
    console.log('   - RPC Port:', app.config.rpc.port);
    console.log('   - Module ID: 1000 (NFT)');

    await app.run();

    console.log('🎉 Lisk NFT Testnet deployment completed!');
    console.log('🔗 Application is running on:', `${app.config.network.host}:${app.config.network.port}`);

    process.on('SIGTERM', () => {
      console.log('Received SIGTERM, shutting down gracefully...');
      app.shutdown();
    });

    process.on('SIGINT', () => {
      console.log('Received SIGINT, shutting down gracefully...');
      app.shutdown();
    });
  } catch (error) {
    console.error('❌ Deployment failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  deployToTestnet();
}

module.exports = { deployToTestnet, testnetConfig };
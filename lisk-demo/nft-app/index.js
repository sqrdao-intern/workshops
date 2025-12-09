const { Application, genesisBlockDevnet, configDevnet } = require('lisk-sdk');
const NFTModule = require('./src/modules/nft/nft_module');

// Configure the application for testnet deployment
const appConfig = {
  ...configDevnet,
  app: {
    label: 'lisk-nft-testnet',
    version: '1.0.0',
    minVersion: '1.0.0',
    protocolVersion: '1.0',
    port: 4000,
    host: '0.0.0.0',
  },
  components: {
    logger: {
      logFileName: 'lisk-nft-testnet.log',
      fileLogLevel: 'debug',
      consoleLogLevel: 'info',
    },
  },
  modules: {
    nft: {
      // NFT module configuration
      enabled: true,
      account: {
        // Account settings for NFT module
      },
    },
  },
  network: {
    enabled: true,
    seedPeers: [
      {
        ip: 'testnet.lisk.io',
        port: 7001,
      },
    ],
    port: 7001,
  },
  transactions: {
    minFeePerByte: 1000,
    baseFee: 1000000,
  },
  forging: {
    force: false,
    waitThreshold: 2,
    delegates: [],
  },
  plugins: {},
};

// Create genesis block for testnet
const genesisBlock = {
  ...genesisBlockDevnet,
  header: {
    ...genesisBlockDevnet.header,
    version: 0,
    height: 0,
    previousBlockID: Buffer.alloc(0),
    timestamp: Math.floor(Date.now() / 1000) - 10,
  },
  payload: [],
};

// Create and configure the application
const app = Application.defaultApplication(genesisBlock, appConfig);

// Register the NFT module
app.registerModule(NFTModule);

// Start the application
app
  .run()
  .then(() => {
    console.log('Lisk NFT application started successfully!');
    console.log('Application running on:', app.config.app.host + ':' + app.config.app.port);
    console.log('NFT module registered and ready for testnet deployment');
  })
  .catch(error => {
    console.error('Failed to start application:', error);
    process.exit(1);
  });

module.exports = app;
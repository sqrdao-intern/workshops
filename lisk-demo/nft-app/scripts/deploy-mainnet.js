const { Application } = require('lisk-sdk');
const NFTModule = require('../src/modules/nft/nft_module');

// Lisk Mainnet Configuration (for reference - not used in development)
const mainnetConfig = {
  label: 'lisk-nft-mainnet',
  version: '1.0.0',
  minVersion: '1.0.0',
  protocolVersion: '1.0',
  port: 8001,
  host: '0.0.0.0',
  
  // Mainnet network configuration
  network: {
    enabled: true,
    seedPeers: [
      {
        ip: 'mainnet.lisk.io',
        port: 8001,
      },
      {
        ip: 'mainnet-seed-01.lisk.io',
        port: 8001,
      },
      {
        ip: 'mainnet-seed-02.lisk.io',
        port: 8001,
      },
    ],
    port: 8001,
  },
  
  // Genesis block configuration for mainnet
  genesisConfig: {
    blockTime: 10,
    maxTransactionsSize: 15360,
    maxPayloadLength: 15360,
    rewards: {
      milestones: [
        '500000000', // Initial reward
        '400000000', // Milestone 1
        '300000000', // Milestone 2
        '200000000', // Milestone 3
        '100000000', // Milestone 4
      ],
      offset: 2160,
      distance: 3000000,
    },
  },
  
  // Forging configuration
  forging: {
    force: false,
    waitThreshold: 2,
    delegates: [],
  },
  
  // Transaction configuration
  transactions: {
    minFeePerByte: 1000,
    baseFee: 1000000,
  },
  
  // Logger configuration
  components: {
    logger: {
      logFileName: 'lisk-nft-mainnet.log',
      fileLogLevel: 'info',
      consoleLogLevel: 'warn',
    },
  },
  
  // Module configuration
  modules: {
    nft: {
      enabled: true,
      account: {},
    },
  },
};

// Genesis block for mainnet
const genesisBlock = {
  header: {
    version: 0,
    height: 0,
    previousBlockID: Buffer.alloc(0),
    timestamp: Math.floor(Date.now() / 1000) - 10,
    generatorPublicKey: Buffer.alloc(0),
    reward: BigInt(0),
    asset: {
      seedReveal: Buffer.alloc(16),
      maxHeightPreviouslyForged: 0,
      maxHeightPrevoted: 0,
      prevoteThreshold: BigInt(0),
      precommitThreshold: BigInt(0),
      certificateThreshold: BigInt(0),
      validators: [],
      impliesMaxPrevotes: true,
    },
  },
  payload: [],
  assets: [],
};

async function deployToMainnet() {
  console.log('🚀 Starting Lisk NFT Mainnet Deployment...');
  
  try {
    // Create application instance
    const app = Application.defaultApplication(genesisBlock, mainnetConfig);
    
    // Register NFT module
    app.registerModule(NFTModule);
    
    console.log('✅ NFT Module registered successfully');
    console.log('📋 Configuration:');
    console.log('   - Network: Mainnet');
    console.log('   - Port:', mainnetConfig.port);
    console.log('   - Host:', mainnetConfig.host);
    console.log('   - Module ID: 1000 (NFT)');
    
    // Start the application
    await app.run();
    
    console.log('🎉 Lisk NFT Mainnet deployment completed!');
    console.log('🔗 Application is running on:', `${mainnetConfig.host}:${mainnetConfig.port}`);
    console.log('📊 NFT endpoints available:');
    console.log('   - GET /api/nft/tokens');
    console.log('   - GET /api/nft/tokens/{id}');
    console.log('   - GET /api/nft/tokens/owner/{address}');
    
    // Keep the process alive
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

// Run deployment if this script is executed directly
if (require.main === module) {
  console.log('⚠️  Mainnet deployment script - use with caution!');
  console.log('This script is for reference only. Mainnet deployment requires proper setup.');
  deployToMainnet();
}

module.exports = { deployToMainnet, mainnetConfig };
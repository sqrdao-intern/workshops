const fs = require('fs');
const path = require('path');

/**
 * Setup configuration script for Lisk NFT Blockchain
 * This script helps configure the blockchain for different environments
 */

const environments = {
  testnet: {
    label: 'lisk-nft-testnet',
    port: 7001,
    host: '0.0.0.0',
    seedPeers: [
      { ip: 'testnet.lisk.io', port: 7001 },
      { ip: 'testnet-seed-01.lisk.io', port: 7001 },
    ],
    logFile: 'lisk-nft-testnet.log',
    logLevel: 'debug',
  },
  mainnet: {
    label: 'lisk-nft-mainnet',
    port: 8001,
    host: '0.0.0.0',
    seedPeers: [
      { ip: 'mainnet.lisk.io', port: 8001 },
      { ip: 'mainnet-seed-01.lisk.io', port: 8001 },
      { ip: 'mainnet-seed-02.lisk.io', port: 8001 },
    ],
    logFile: 'lisk-nft-mainnet.log',
    logLevel: 'info',
  },
  dev: {
    label: 'lisk-nft-dev',
    port: 4000,
    host: '127.0.0.1',
    seedPeers: [],
    logFile: 'lisk-nft-dev.log',
    logLevel: 'debug',
  },
};

function setupConfig(env = 'testnet') {
  const config = environments[env];
  
  if (!config) {
    console.error(`❌ Unknown environment: ${env}`);
    console.log('Available environments:', Object.keys(environments).join(', '));
    process.exit(1);
  }
  
  console.log(`🔧 Setting up Lisk NFT configuration for ${env}...`);
  
  // Create config directory if it doesn't exist
  const configDir = path.join(__dirname, '..', 'config');
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
  }
  
  // Generate configuration file
  const configContent = {
    label: config.label,
    version: '1.0.0',
    minVersion: '1.0.0',
    protocolVersion: '1.0',
    port: config.port,
    host: config.host,
    network: {
      enabled: true,
      seedPeers: config.seedPeers,
      port: config.port,
    },
    components: {
      logger: {
        logFileName: config.logFile,
        fileLogLevel: config.logLevel,
        consoleLogLevel: 'info',
      },
    },
    modules: {
      nft: {
        enabled: true,
        account: {},
      },
    },
  };
  
  const configFile = path.join(configDir, `${env}.json`);
  fs.writeFileSync(configFile, JSON.stringify(configContent, null, 2));
  
  console.log(`✅ Configuration saved to: ${configFile}`);
  console.log('📋 Configuration summary:');
  console.log(`   - Environment: ${env}`);
  console.log(`   - Label: ${config.label}`);
  console.log(`   - Port: ${config.port}`);
  console.log(`   - Host: ${config.host}`);
  console.log(`   - Log file: ${config.logFile}`);
  console.log(`   - Log level: ${config.logLevel}`);
  
  if (config.seedPeers.length > 0) {
    console.log(`   - Seed peers: ${config.seedPeers.length}`);
  } else {
    console.log('   - Seed peers: None (local development)');
  }
  
  // Create environment file
  const envFile = path.join(__dirname, '..', '.env');
  const envContent = `# Lisk NFT Blockchain Configuration
NODE_ENV=${env}
LISK_PORT=${config.port}
LISK_HOST=${config.host}
LISK_LABEL=${config.label}
LOG_LEVEL=${config.logLevel}
`;
  
  fs.writeFileSync(envFile, envContent);
  console.log(`✅ Environment file created: ${envFile}`);
  
  console.log('\n🚀 Next steps:');
  console.log('1. Review the generated configuration files');
  console.log('2. Run: npm run start:dev (for development)');
  console.log('3. Run: npm run deploy:testnet (for testnet)');
  console.log('4. Run: npm run deploy:mainnet (for mainnet - caution!)');
}

// Handle command line arguments
const env = process.argv[2] || 'testnet';
setupConfig(env);
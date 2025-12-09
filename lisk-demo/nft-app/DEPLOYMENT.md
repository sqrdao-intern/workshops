# Lisk NFT Blockchain Deployment Guide

## 🚀 Overview

This guide will help you deploy your Lisk NFT blockchain application to the Lisk testnet and mainnet.

## 📋 Prerequisites

- Node.js >= 16.0.0
- npm >= 8.0.0
- Git
- Basic understanding of blockchain concepts

## 🔧 Installation

1. **Install dependencies:**
   ```bash
   cd nft-app
   npm install
   ```

2. **Setup configuration:**
   ```bash
   npm run setup:config testnet  # For testnet
   npm run setup:config mainnet  # For mainnet (production)
   ```

## 🧪 Testnet Deployment

### Quick Start
```bash
npm run deploy:testnet
```

### Manual Configuration
1. Edit the configuration in `scripts/deploy-testnet.js`
2. Start the application:
   ```bash
   node scripts/deploy-testnet.js
   ```

### Testnet Configuration
- **Network**: Lisk Testnet
- **Port**: 7001
- **Seed Peers**: 
  - testnet.lisk.io:7001
  - testnet-seed-01.lisk.io:7001

## 🌐 Mainnet Deployment (Production)

⚠️ **Warning**: Mainnet deployment should only be done after thorough testing on testnet.

### Quick Start
```bash
npm run deploy:mainnet
```

### Manual Configuration
1. Edit the configuration in `scripts/deploy-mainnet.js`
2. Ensure proper security measures
3. Start the application:
   ```bash
   node scripts/deploy-mainnet.js
   ```

### Mainnet Configuration
- **Network**: Lisk Mainnet
- **Port**: 8001
- **Seed Peers**:
  - mainnet.lisk.io:8001
  - mainnet-seed-01.lisk.io:8001
  - mainnet-seed-02.lisk.io:8001

## 📊 NFT Module Features

### Available Commands
- **Mint NFT**: Create new NFTs with name, description, and URI
- **Transfer NFT**: Transfer ownership between addresses
- **Burn NFT**: Permanently destroy NFTs

### API Endpoints
- `GET /api/nft/tokens` - Get all NFTs
- `GET /api/nft/tokens/{id}` - Get specific NFT by ID
- `GET /api/nft/tokens/owner/{address}` - Get NFTs by owner address

### Transaction Types
- **Mint Transaction**: Creates new NFTs
- **Transfer Transaction**: Transfers NFT ownership
- **Burn Transaction**: Destroys NFTs

## 🔒 Security Best Practices

1. **Private Keys**: Never commit private keys to version control
2. **Configuration**: Use environment variables for sensitive data
3. **Network**: Always test on testnet before mainnet
4. **Monitoring**: Set up proper logging and monitoring
5. **Updates**: Keep dependencies updated

## 🛠️ Development

### Development Mode
```bash
npm run start:dev
```

### Testing
```bash
npm test
npm run test:watch
```

### Linting
```bash
npm run lint
npm run lint:fix
```

## 📈 Monitoring

### Logs
- Testnet: `lisk-nft-testnet.log`
- Mainnet: `lisk-nft-mainnet.log`
- Development: `lisk-nft-dev.log`

### Health Checks
The application exposes health check endpoints:
- `/api/node/status` - Node status
- `/api/node/info` - Node information

## 🚨 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Find process using port
   lsof -i :7001
   # Kill process
   kill -9 <PID>
   ```

2. **Connection Issues**
   - Check firewall settings
   - Verify seed peer connectivity
   - Check network configuration

3. **Module Registration Failed**
   - Ensure NFT module is properly implemented
   - Check module ID conflicts
   - Verify dependencies

### Debug Mode
Enable debug logging by setting:
```bash
export DEBUG=lisk:*
```

## 📚 Additional Resources

- [Lisk SDK Documentation](https://lisk.com/documentation/lisk-sdk/)
- [Lisk SDK API Reference](https://lisk.com/documentation/lisk-sdk/references/)
- [Lisk Discord Community](https://lisk.chat/)

## 🤝 Support

For issues and questions:
1. Check the logs first
2. Review this documentation
3. Join the Lisk community
4. Create an issue in the repository

## 📄 License

This project is licensed under the MIT License.
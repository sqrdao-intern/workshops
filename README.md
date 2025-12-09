# Workshops Collection

A comprehensive collection of AI-powered prototyping and blockchain development workshops, focusing on Lisk and Solana ecosystems.

## 📋 Overview

This repository contains interactive workshop materials, demo projects, and educational resources for building blockchain applications with AI assistance. The workshops cover topics ranging from ideation and visualization to smart contract development and NFT creation.

## 🗂️ Directory Structure

### Workshop Materials

#### **AI workshop Lisk**
Interactive HTML/JavaScript workshop guide for the Lisk ecosystem. Features tabbed navigation covering ideation, visualization, presentations, data storytelling, and prototyping with AI tools.

- **Tech Stack**: HTML, JavaScript, Tailwind CSS, Chart.js
- **Features**: Interactive data visualizations, AI tool comparisons, Lisk ecosystem integration examples
- **Files**: `index.html`, `main.js`, `style.css`

#### **AI workshop Solana**
Interactive HTML/JavaScript workshop guide tailored for the Solana ecosystem. Similar structure to the Lisk workshop but with Solana-specific content and examples.

- **Tech Stack**: HTML, JavaScript, Tailwind CSS, Chart.js
- **Features**: Solana dApp ideation, market insights visualization, ecosystem integration guides
- **Files**: `index.html`, `app.js`, `styles.css`

#### **Solana Camp workshop**
Top 10 AI-Powered Solana dApp Ideas workshop. Interactive guide showcasing innovative dApp concepts combining AI and Solana blockchain technology.

- **Tech Stack**: HTML, JavaScript, Tailwind CSS, Chart.js
- **Features**: Detailed dApp idea exploration, interactive cards, data storytelling examples
- **Files**: `index.html`, `app.js`, `styles.css`

### Builder Challenge Projects

#### **lisk-builder-challenge-ai-workshop**
Next.js presentation application for AI-powered prototyping workshops. Features slide-based presentation system with PDF export capabilities.

- **Tech Stack**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Features**: Interactive slides, PDF generation, responsive design
- **Documentation**: See [README.md](lisk-builder-challenge-ai-workshop/README.md)
- **Quick Start**:
  ```bash
  cd lisk-builder-challenge-ai-workshop
  npm install
  npm run dev
  ```

#### **lisk-builder-challenge-gtm-workshop**
Interactive Go-To-Market (GTM) strategy guide built with React. Provides comprehensive GTM planning tools and templates.

- **Tech Stack**: React, Material-UI, HTML2PDF.js
- **Features**: Interactive forms, strategy templates, PDF export
- **Files**: `index.html`, `assets/js/app.js`, `assets/css/main.css`

### Demo Projects

#### **lisk-demo/**
Complete NFT workshop demo project demonstrating full-stack NFT development on Lisk.

##### **nft-app/**
Lisk SDK module for on-chain NFT interactions. Implements custom NFT module with mint, transfer, and burn commands.

- **Tech Stack**: Node.js, Lisk SDK 6.0
- **Features**: Custom NFT module, blockchain commands, testnet/mainnet deployment
- **Documentation**: See [DEPLOYMENT.md](lisk-demo/nft-app/DEPLOYMENT.md)
- **Quick Start**:
  ```bash
  cd lisk-demo/nft-app
  npm install
  npm run setup:config testnet
  npm run deploy:testnet
  ```

##### **nft-hardhat/**
Hardhat project for deploying ERC-721 NFT contracts to Lisk Sepolia. Includes OpenZeppelin contracts and deployment scripts.

- **Tech Stack**: Hardhat, TypeScript, Solidity, OpenZeppelin Contracts
- **Features**: ERC-721 contract, deployment scripts, TypeScript types
- **Quick Start**:
  ```bash
  cd lisk-demo/nft-hardhat
  npm install
  npm run compile
  npm run deploy:sepolia
  ```

##### **nft-webapp/**
React web application for minting NFTs with AI-generated artwork. Integrates BytePlus ModelArk (Deepseek v3 + Seedream 4.0) for automatic description and image generation.

- **Tech Stack**: React 19, Express, Ethers.js, Chakra UI, BytePlus ModelArk API
- **Features**: 
  - Wallet connection (MetaMask)
  - AI-powered NFT generation
  - Image generation with Seedream 4.0
  - Text generation with Deepseek v3
  - NFT gallery and detail views
- **Documentation**: See [README.md](lisk-demo/nft-webapp/README.md)
- **Quick Start**:
  ```bash
  cd lisk-demo/nft-webapp
  npm install
  # Configure .env file with API keys
  npm run dev
  ```

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ (for most projects)
- **npm** 8+ (bundled with Node.js)
- **Git** (for version control)
- **MetaMask** or compatible Web3 wallet (for blockchain projects)
- **BytePlus ModelArk account** (for NFT webapp AI features)

### Getting Started

1. **Clone the repository** (after GitHub setup):
   ```bash
   git clone <your-repo-url>
   cd workshops
   ```

2. **Choose a project** from the directory structure above

3. **Navigate to the project directory**:
   ```bash
   cd <project-name>
   ```

4. **Install dependencies**:
   ```bash
   npm install
   ```

5. **Follow project-specific setup instructions** in individual README files

## 🛠️ Technology Stack Summary

### Frontend Technologies
- **React** 19 - Modern UI framework
- **Next.js** 16 - React framework with SSR
- **Tailwind CSS** - Utility-first CSS framework
- **Chart.js** - Data visualization library
- **Chakra UI** - Component library

### Blockchain Technologies
- **Lisk SDK** 6.0 - Lisk blockchain development
- **Hardhat** - Ethereum development environment
- **Solidity** - Smart contract language
- **Ethers.js** - Ethereum JavaScript library
- **OpenZeppelin Contracts** - Secure smart contract library

### AI Integration
- **BytePlus ModelArk** - AI model platform
- **Deepseek v3** - Text generation model
- **Seedream 4.0** - Image generation model

### Development Tools
- **TypeScript** - Type-safe JavaScript
- **ESLint** - Code linting
- **Jest** - Testing framework

## 📚 Workshop Topics Covered

1. **AI-Powered Ideation**
   - LLM interfaces (Gemini, DeepSeek, ChatGPT)
   - Brainstorming techniques
   - Concept refinement

2. **Visual Creation**
   - AI image generation (Imagen, Seedream)
   - Design tools (Canva AI, Microsoft Designer)
   - Visual prototyping

3. **Presentation Tools**
   - Automated slide generation (Gamma.app)
   - AI-enhanced presentations (Google Slides)
   - Video generation (Veo 3)

4. **Data Storytelling**
   - Market insights visualization
   - Interactive charts and graphs
   - Data-driven narratives

5. **Rapid Prototyping**
   - AI coding assistants (Cursor)
   - Component generation (v0.dev)
   - User research tools (Lovable)

6. **Blockchain Development**
   - Smart contract development
   - NFT creation and management
   - Blockchain module development
   - Deployment strategies

## 🔗 Project Documentation Links

- [AI Workshop (Lisk)](AI workshop Lisk/index.html) - Interactive workshop guide
- [AI Workshop (Solana)](AI workshop Solana/index.html) - Solana-focused workshop
- [Solana Camp Workshop](Solana Camp workshop/index.html) - Top 10 dApp ideas
- [Lisk Builder Challenge - AI Workshop](lisk-builder-challenge-ai-workshop/README.md) - Next.js presentation app
- [NFT Webapp](lisk-demo/nft-webapp/README.md) - NFT minting with AI
- [NFT App Deployment](lisk-demo/nft-app/DEPLOYMENT.md) - Lisk SDK deployment guide

## 🤝 Contributing

This is a workshop collection repository. Contributions, improvements, and suggestions are welcome! Please:

1. Review existing code and documentation
2. Follow the coding style of each project
3. Update relevant documentation
4. Test your changes thoroughly

## 📝 Notes

- Individual projects may have their own README files with detailed setup instructions
- Some projects require API keys or environment variables (see project-specific documentation)
- Blockchain projects require testnet tokens for testing
- AI features require appropriate API access and quotas

## 📄 License

Projects in this repository may have different licenses. Please check individual project directories for license information.

## 🙏 Acknowledgments

- Lisk Foundation for blockchain infrastructure
- Solana Foundation for ecosystem support
- BytePlus for AI model access
- OpenZeppelin for secure contract libraries
- All workshop participants and contributors

---

**Last Updated**: 2025


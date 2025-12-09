import React, { useState } from 'react';
import { WalletProvider } from './contexts/WalletContext';
import WalletConnect from './components/WalletConnect';
import NFTGallery from './components/NFTGallery';
import MintNFTForm from './components/MintNFTForm';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState(0);

  const tabStyle = {
    padding: '10px 20px',
    fontWeight: 'bold',
    cursor: 'pointer',
    borderBottom: '2px solid transparent'
  };

  const activeTabStyle = {
    ...tabStyle,
    borderBottom: '2px solid #3182CE'
  };

  return (
    <WalletProvider>
      <div style={{ minHeight: '100vh', backgroundColor: '#F7FAFC' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h1 style={{ fontSize: '2rem', color: '#3182CE' }}>Lisk NFT Gallery</h1>
            <WalletConnect />
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', borderBottom: '1px solid #E2E8F0' }}>
              <div 
                style={activeTab === 0 ? activeTabStyle : tabStyle}
                onClick={() => setActiveTab(0)}>
                Gallery
              </div>
              <div 
                style={activeTab === 1 ? activeTabStyle : tabStyle}
                onClick={() => setActiveTab(1)}>
                Mint NFT
              </div>
            </div>
          </div>

          {activeTab === 0 ? (
            <NFTGallery />
          ) : (
            <MintNFTForm />
          )}
        </div>
      </div>
    </WalletProvider>
  );
}

export default App;

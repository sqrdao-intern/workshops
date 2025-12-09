import React from 'react';
import { useWallet } from '../contexts/WalletContext';

const truncateAddress = (address) =>
  `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;

const WalletConnect = () => {
  const { wallet, connectWallet, disconnectWallet, error } = useWallet();

  const buttonStyle = {
    padding: '8px 16px',
    borderRadius: '4px',
    fontWeight: 'bold',
    cursor: 'pointer',
    border: 'none',
    color: 'white',
    transition: 'background-color 0.2s'
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
      {error && (
        <div style={{
          backgroundColor: '#FEE2E2',
          color: '#9B2C2C',
          padding: '8px 12px',
          borderRadius: '6px',
          fontSize: '0.85rem',
          maxWidth: '480px'
        }}>
          {error}
        </div>
      )}

      <div style={{ marginLeft: 'auto' }}>
        {wallet.connected ? (
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.875rem', marginBottom: '4px' }}>
              {truncateAddress(wallet.address)}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#4A5568', marginBottom: '8px' }}>
              Balance: {Number(wallet.balance).toFixed(4)} ETH
            </div>
            <button
              style={{ ...buttonStyle, backgroundColor: '#E53E3E' }}
              onClick={disconnectWallet}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#C53030')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#E53E3E')}
            >
              Disconnect
            </button>
          </div>
        ) : (
          <button
            style={{ ...buttonStyle, backgroundColor: '#3182CE' }}
            onClick={connectWallet}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#2B6CB0')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#3182CE')}
          >
            Connect MetaMask
          </button>
        )}
      </div>
    </div>
  );
};

export default WalletConnect;
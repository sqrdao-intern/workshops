import React, { useMemo, useState } from 'react';
import { useWallet } from '../contexts/WalletContext';
import api from '../services/api';

const NFTDetail = ({ nft, onClose, onSuccess }) => {
  const { wallet } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [recipientAddress, setRecipientAddress] = useState('');
  const [showTransfer, setShowTransfer] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('');

  const normalizedOwner = useMemo(() => nft.owner?.toLowerCase?.() ?? '', [nft.owner]);
  const isOwner = useMemo(() => wallet.connected && wallet.address?.toLowerCase() === normalizedOwner, [wallet.connected, wallet.address, normalizedOwner]);

  const ensureReady = () => {
    if (!wallet.connected || !wallet.networkOk) {
      setMessage('Connect MetaMask to the Lisk Sepolia network to perform this action.');
      setMessageType('warning');
      return false;
    }
    return true;
  };

  const handleTransfer = async () => {
    if (!ensureReady()) return;
    if (!recipientAddress) {
      setMessage('Recipient address required');
      setMessageType('error');
      return;
    }

    try {
      setIsLoading(true);
      await api.transferNFT(nft.id, wallet.address, recipientAddress);
      setMessage(`Successfully transferred "${nft.name}" to ${recipientAddress}`);
      setMessageType('success');
      setShowTransfer(false);
      if (onSuccess) onSuccess();
      if (onClose) onClose();
    } catch (error) {
      console.error('Transfer failed:', error);
      setMessage(error?.shortMessage || error?.message || 'Could not transfer NFT');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBurn = async () => {
    if (!ensureReady()) return;

    try {
      setIsLoading(true);
      await api.burnNFT(nft.id);
      setMessage(`Successfully burned "${nft.name}"`);
      setMessageType('success');
      if (onSuccess) onSuccess();
      if (onClose) onClose();
    } catch (error) {
      console.error('Burn failed:', error);
      setMessage(error?.shortMessage || error?.message || 'Could not burn NFT');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  const containerStyle = { padding: '16px' };
  const infoStyle = { fontSize: '0.9rem', color: '#4A5568', marginBottom: '8px' };
  const btnStyle = {
    padding: '8px 12px',
    borderRadius: '4px',
    fontWeight: 'bold',
    cursor: 'pointer',
    border: 'none',
    color: 'white'
  };

  return (
    <div style={containerStyle}>
      <img
        src={nft.uri || nft.image || 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect width="100%" height="100%" fill="%23EDF2F7"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%234A5568" font-size="16">NFT Image</text></svg>'}
        alt={nft.name}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        style={{ maxHeight: '400px', width: '100%', objectFit: 'contain', borderRadius: '6px', marginBottom: '16px' }}
        onError={(e) => { e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect width="100%" height="100%" fill="%23EDF2F7"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%234A5568" font-size="16">NFT Image</text></svg>'; }}
      />

      <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{nft.name}</h2>
      <p style={{ marginBottom: '12px' }}>{nft.description}</p>
      <div style={infoStyle}>ID: {nft.id}</div>
      <div style={{ ...infoStyle, marginBottom: '16px' }}>Owner: {nft.owner}</div>

      {message && (
        <div style={{
          padding: '10px',
          marginBottom: '12px',
          borderRadius: '4px',
          color: messageType === 'error' ? '#9B2C2C' : '#2F855A',
          backgroundColor: messageType === 'error' ? '#FEE2E2' : '#C6F6D5'
        }}>
          {message}
        </div>
      )}

      {isOwner && (
        <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
          <button
            style={{ ...btnStyle, backgroundColor: '#3182CE' }}
            onClick={() => setShowTransfer((v) => !v)}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2B6CB0'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3182CE'}
          >
            Transfer
          </button>
          <button
            style={{ ...btnStyle, backgroundColor: '#E53E3E' }}
            onClick={handleBurn}
            disabled={isLoading}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#C53030'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#E53E3E'}
          >
            {isLoading ? 'Burning...' : 'Burn'}
          </button>
        </div>
      )}

      {isOwner && showTransfer && (
        <div style={{ marginTop: '16px' }}>
          <label style={{ fontWeight: 'bold', marginBottom: '8px', display: 'block' }}>Recipient Address</label>
          <input
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
            placeholder="Enter recipient's address (0x...)"
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #E2E8F0', marginBottom: '8px' }}
          />
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              style={{ ...btnStyle, backgroundColor: '#A0AEC0' }}
              onClick={() => setShowTransfer(false)}
            >
              Cancel
            </button>
            <button
              style={{ ...btnStyle, backgroundColor: '#3182CE' }}
              onClick={handleTransfer}
              disabled={isLoading}
            >
              {isLoading ? 'Transferring...' : 'Transfer'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NFTDetail;
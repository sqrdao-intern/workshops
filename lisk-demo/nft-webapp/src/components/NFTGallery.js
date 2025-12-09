import React, { useState, useEffect } from 'react';
import { useWallet } from '../contexts/WalletContext';
import api from '../services/api';

const NFTGallery = ({ onNFTClick }) => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { wallet } = useWallet();

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        setLoading(true);
        let data;
        
        if (wallet.connected) {
          // If wallet is connected, fetch user's NFTs
          data = await api.getNFTsByOwner(wallet.address);
          // Fallback to demo NFTs if user has none
          if (!Array.isArray(data) || data.length === 0) {
            data = await api.getAllNFTs();
          }
        } else {
          // Otherwise fetch all NFTs (demo list)
          data = await api.getAllNFTs();
        }
        
        setNfts(data || []);
      } catch (error) {
        console.error('Error fetching NFTs:', error);
        // Display error in console instead of toast
        console.error('Could not load NFTs:', error.message || 'Unknown error');
        // Set empty array if error occurs
        setNfts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNFTs();
    
    // Refresh NFTs every 30 seconds
    const interval = setInterval(fetchNFTs, 30000);
    
    return () => clearInterval(interval);
  }, [wallet.connected, wallet.address]);

  if (loading) {
    return (
      <div style={{ height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ border: '4px solid #f3f3f3', borderTop: '4px solid #3182CE', borderRadius: '50%', width: '50px', height: '50px', animation: 'spin 1s linear infinite' }}></div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (nfts.length === 0) {
    return (
      <div style={{ padding: '24px', backgroundColor: 'white', borderRadius: '6px', boxShadow: '0 1px 3px rgba(0,0,0,0.12)', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>No NFTs Found</h2>
        <p>
          {wallet.connected 
            ? "You don't own any NFTs yet. Try minting one!" 
            : "Connect your wallet to view your NFTs or mint new ones."}
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '24px' }}>
      {nfts.map((nft) => (
        <div 
          key={nft.id} 
          style={{ 
            backgroundColor: 'white', 
            borderRadius: '8px', 
            overflow: 'hidden', 
            boxShadow: '0 1px 3px rgba(0,0,0,0.12)', 
            transition: 'transform 0.2s', 
            cursor: 'pointer' 
          }}
          onClick={() => onNFTClick && onNFTClick(nft)}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <img 
            src={nft.image || nft.uri || 'https://via.placeholder.com/300?text=No+Image'} 
            alt={nft.name} 
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            onError={(e) => {
              e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200"><rect width="100%" height="100%" fill="%23EDF2F7"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%234A5568" font-size="16">Image unavailable</text></svg>';
            }}
          />
          <div style={{ padding: '16px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '8px' }}>{nft.name}</h3>
            <p style={{ fontSize: '0.9rem', color: '#718096', marginBottom: '8px' }}>ID: {nft.id}</p>
            <p style={{ fontSize: '0.9rem', color: '#4A5568', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {nft.description || 'No description available'}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default NFTGallery;
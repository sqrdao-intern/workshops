import React, { useMemo, useState } from 'react';
import { useWallet } from '../contexts/WalletContext';
import api from '../services/api';

const MintNFTForm = () => {
  const buildFallbackName = (text) => {
    if (!text || typeof text !== 'string') {
      return 'Untitled NFT';
    }
    const terms = text.trim().split(/\s+/).slice(0, 5);
    if (!terms.length) {
      return 'Untitled NFT';
    }
    return terms
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    uri: ''
  });
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(''); // 'success' | 'error' | 'warning'
  const [generatedMedia, setGeneratedMedia] = useState({
    imageUrl: '',
    note: ''
  });
  const { wallet } = useWallet();

  const contractConfigured = useMemo(() => Boolean(api.getContractAddress()), []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!contractConfigured) {
      setMessage('Contract address missing. Configure REACT_APP_NFT_CONTRACT_ADDRESS and redeploy.');
      setMessageType('error');
      return;
    }

    if (!wallet.connected || !wallet.networkOk) {
      setMessage('Connect MetaMask to the Lisk Sepolia network to mint.');
      setMessageType('warning');
      return;
    }

    try {
      setIsSubmitting(true);
      await api.mintNFT(formData.name, formData.description, formData.uri, wallet.address);
      setMessage(`Successfully minted "${formData.name}".`);
      setMessageType('success');
      setFormData({ name: '', description: '', uri: '' });
      setGeneratedMedia({ imageUrl: '', note: '' });
    } catch (error) {
      console.error('Minting failed:', error);
      setMessage(error?.shortMessage || error?.message || 'Failed to mint NFT');
      setMessageType('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setMessage('Please enter a theme or prompt to generate content');
      setMessageType('warning');
      return;
    }
    try {
      setIsGenerating(true);
      setMessage(null);
      const { name: generatedName, description, imageUrl, fallbackNote } = await api.generateNFTContent(prompt);
      const resolvedName = (generatedName && generatedName.trim()) || buildFallbackName(prompt);
      setFormData((prev) => ({
        ...prev,
        name: resolvedName || prev.name,
        description: description || prev.description,
        uri: imageUrl || prev.uri,
      }));
      setGeneratedMedia({
        imageUrl: imageUrl || '',
        note: fallbackNote || ''
      });
      if (fallbackNote) {
        setMessage(fallbackNote);
        setMessageType('warning');
      } else {
        setMessage('Generated NFT name, description, and image successfully');
        setMessageType('success');
      }
    } catch (error) {
      setMessage(error?.message || 'Failed to generate NFT content');
      setMessageType('error');
      setGeneratedMedia({ imageUrl: '', note: '' });
    } finally {
      setIsGenerating(false);
    }
  };

  const containerStyle = {
    padding: '24px',
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: 'white',
    borderRadius: '6px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12)'
  };

  const labelStyle = { fontWeight: 'bold', marginBottom: '8px' };
  const inputStyle = {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #E2E8F0'
  };
  const buttonStyle = {
    padding: '10px 16px',
    borderRadius: '4px',
    fontWeight: 'bold',
    cursor: 'pointer',
    border: 'none',
    color: 'white',
    backgroundColor: '#3182CE'
  };

  const disabled =
    !contractConfigured ||
    !wallet.connected ||
    !wallet.networkOk ||
    isSubmitting ||
    !formData.name ||
    !formData.description ||
    !formData.uri;

  return (
    <div style={containerStyle}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Mint New NFT</h2>

      {message && (
        <div style={{
          padding: '10px',
          marginBottom: '12px',
          borderRadius: '4px',
          color: messageType === 'error' ? '#9B2C2C' : messageType === 'warning' ? '#975A16' : '#2F855A',
          backgroundColor: messageType === 'error' ? '#FEE2E2' : messageType === 'warning' ? '#FEF3C7' : '#C6F6D5'
        }}>
          {message}
        </div>
      )}

      {!wallet.connected && (
        <div style={{ padding: '10px', marginBottom: '12px', borderRadius: '4px', color: '#975A16', backgroundColor: '#FEF3C7' }}>
          Connect your wallet to mint NFTs
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '12px' }}>
          <label style={labelStyle}>Theme / Prompt</label>
          <input
            name="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. Neon cyberpunk skyline with holograms"
            style={inputStyle}
            disabled={isGenerating}
          />
          <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
            <button
              type="button"
              style={{ ...buttonStyle, backgroundColor: '#4A5568' }}
              disabled={isGenerating || !prompt.trim()}
              onClick={handleGenerate}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2D3748'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4A5568'}
            >
              {isGenerating ? 'Generating...' : 'Generate NFT Content'}
            </button>
          </div>
        </div>
        {generatedMedia.imageUrl && (
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Generated Preview</div>
            <div style={{
              position: 'relative',
              borderRadius: '6px',
              overflow: 'hidden',
              border: '1px solid #E2E8F0',
              backgroundColor: '#F7FAFC'
            }}>
              <img
                src={generatedMedia.imageUrl}
                alt={prompt || formData.name || 'Generated NFT preview'}
                style={{ display: 'block', width: '100%', objectFit: 'cover', maxHeight: '360px' }}
              />
            </div>
            {generatedMedia.note && (
              <div style={{
                marginTop: '8px',
                fontSize: '0.9rem',
                color: '#975A16',
                backgroundColor: '#FEF3C7',
                borderRadius: '4px',
                padding: '8px'
              }}>
                {generatedMedia.note}
              </div>
            )}
          </div>
        )}
        <div style={{ marginBottom: '12px' }}>
          <label style={labelStyle}>NFT Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter NFT name"
            style={inputStyle}
            disabled={!wallet.connected || isSubmitting}
          />
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label style={labelStyle}>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your NFT"
            style={{ ...inputStyle, minHeight: '100px' }}
            disabled={!wallet.connected || isSubmitting}
          />
        </div>

        <button
          type="submit"
          style={buttonStyle}
          disabled={disabled}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2B6CB0'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3182CE'}
        >
          {isSubmitting ? 'Minting...' : 'Mint NFT'}
        </button>
      </form>
    </div>
  );
};

export default MintNFTForm;
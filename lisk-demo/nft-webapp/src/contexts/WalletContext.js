import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from 'ethers';
import api from '../services/api';
import { CONTRACT_ADDRESS, LISK_SEPOLIA_CHAIN } from '../config/contract';

const WalletContext = createContext();

const emptyWallet = {
  connected: false,
  address: '',
  balance: '0',
  provider: null,
  signer: null,
  networkOk: false,
};

export const WalletProvider = ({ children }) => {
  const [wallet, setWallet] = useState(emptyWallet);
  const [error, setError] = useState('');

  const resetWallet = useCallback(() => {
    api.setSigner(null);
    setWallet(emptyWallet);
  }, []);

  const ensureNetwork = useCallback(async (ethereum) => {
    try {
      const chainId = await ethereum.request({ method: 'eth_chainId' });
      if (chainId === LISK_SEPOLIA_CHAIN.chainId) {
        return true;
      }

      try {
        await ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: LISK_SEPOLIA_CHAIN.chainId }]
        });
        return true;
      } catch (switchError) {
        if (switchError.code === 4902) {
          await ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [LISK_SEPOLIA_CHAIN]
          });
          return true;
        }
        throw switchError;
      }
    } catch (networkError) {
      console.error('Failed to ensure Lisk Sepolia network:', networkError);
      setError('Unable to switch to Lisk Sepolia. Please add the network manually in MetaMask.');
      return false;
    }
  }, []);

  const refreshWallet = useCallback(async (ethereum, address) => {
    if (!ethereum || !address) {
      resetWallet();
      return;
    }

    const provider = new ethers.BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const balanceWei = await provider.getBalance(address);

    api.setSigner(signer);

    setWallet({
      connected: true,
      address: ethers.getAddress(address),
      balance: ethers.formatEther(balanceWei),
      provider,
      signer,
      networkOk: true,
    });
    setError('');
  }, [resetWallet]);

  const connectWallet = useCallback(async () => {
    if (!CONTRACT_ADDRESS) {
      setError('Contract address is not configured. Set REACT_APP_NFT_CONTRACT_ADDRESS before connecting.');
      return;
    }

    const ethereum = await detectEthereumProvider({ mustBeMetaMask: true });
    if (!ethereum) {
      setError('MetaMask not detected. Install MetaMask to continue.');
      return;
    }

    const networkReady = await ensureNetwork(ethereum);
    if (!networkReady) {
      return;
    }

    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      if (!accounts || accounts.length === 0) {
        setError('No accounts returned from wallet.');
        return;
      }
      await refreshWallet(ethereum, accounts[0]);
    } catch (requestError) {
      console.error('Wallet connection failed:', requestError);
      setError(requestError.message || 'User rejected the connection request.');
    }
  }, [ensureNetwork, refreshWallet]);

  const disconnectWallet = useCallback(() => {
    resetWallet();
  }, [resetWallet]);

  useEffect(() => {
    const ethereum = window.ethereum;
    if (!ethereum) {
      return;
    }

    const handleAccountsChanged = (accounts) => {
      if (!accounts || accounts.length === 0) {
        resetWallet();
        return;
      }
      refreshWallet(ethereum, accounts[0]);
    };

    const handleChainChanged = (chainId) => {
      if (chainId !== LISK_SEPOLIA_CHAIN.chainId) {
        setWallet((prev) => ({ ...prev, networkOk: false }));
        setError('Switch MetaMask to Lisk Sepolia to continue.');
      } else if (wallet.connected) {
        refreshWallet(ethereum, wallet.address);
      }
    };

    ethereum.on('accountsChanged', handleAccountsChanged);
    ethereum.on('chainChanged', handleChainChanged);

    (async () => {
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      if (accounts && accounts.length > 0) {
        const networkReady = await ensureNetwork(ethereum);
        if (networkReady) {
          await refreshWallet(ethereum, accounts[0]);
        }
      }
    })();

    return () => {
      if (ethereum.removeListener) {
        ethereum.removeListener('accountsChanged', handleAccountsChanged);
        ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, [ensureNetwork, refreshWallet, resetWallet, wallet.connected, wallet.address]);

  return (
    <WalletContext.Provider value={{ wallet, connectWallet, disconnectWallet, error }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
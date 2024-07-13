import React, { createContext, useState, useEffect } from 'react';
import { useUserWallets, useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { ethers } from 'ethers';
import { FUNDIND_ABI, FUNDIND_ADDRESS } from './../contract.config';

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [primaryWallet, setPrimaryWallet] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isAnyLoggedIn, setAnyLoggedIn] = useState(false);
  const [contract, setContract] = useState(null);

  const userWallets = useUserWallets();
  const { primaryWallet: dynamicPrimaryWallet } = useDynamicContext();

  useEffect(() => {
    if (dynamicPrimaryWallet && dynamicPrimaryWallet.connected) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }

    setPrimaryWallet(dynamicPrimaryWallet);

    let anyWalletConnected = false;
    if (userWallets && userWallets.length > 0) {
      for (const wallet of userWallets) {
        if (wallet.address && wallet.connected) {
          anyWalletConnected = true;
          break;
        }
      }
    }
    setAnyLoggedIn(anyWalletConnected);

    if (dynamicPrimaryWallet && dynamicPrimaryWallet.provider) {
      const provider = new ethers.BrowserProvider(dynamicPrimaryWallet.provider);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract(FUNDIND_ADDRESS, FUNDIND_ABI, signer);
      setContract(contractInstance);
    }
  }, [dynamicPrimaryWallet, userWallets]);

  return (
    <WalletContext.Provider value={{
      primaryWallet,
      isLoggedIn,
      isAnyLoggedIn,
      contract
    }}>
      {children}
    </WalletContext.Provider>
  );
};

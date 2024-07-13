import React, { useEffect, useState } from 'react';
import { useUserWallets, useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { ethers } from 'ethers';
import { FUNDIND_ABI, FUNDIND_ADDRESS } from './contract.config';

const ListConnectedWallets = ({ handleLoggin, getWallet, handleisAnyLoggedIn, handleContract }) => {
  const userWallets = useUserWallets();
  const { primaryWallet } = useDynamicContext();

  useEffect(() => {
    if (primaryWallet && primaryWallet.connected) {
      handleLoggin(true);
    } else {
      handleLoggin(false);
    }

    getWallet(primaryWallet);

    let anyWalletConnected = false;
    if (userWallets && userWallets.length > 0) {
      for (const wallet of userWallets) {
        if (wallet.address && wallet.connected) {
          anyWalletConnected = true;
          break;
        }
      }
    }
    handleisAnyLoggedIn(anyWalletConnected);

  }, [primaryWallet, userWallets, handleLoggin, getWallet, handleisAnyLoggedIn]);

  return (
    <span></span>
  );
}

export default ListConnectedWallets;

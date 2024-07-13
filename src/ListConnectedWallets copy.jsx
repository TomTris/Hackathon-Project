import React, { useEffect } from 'react';
import { useUserWallets, useDynamicContext } from '@dynamic-labs/sdk-react-core';

const ListConnectedWallets = ({ handleLoggin, getWallet, handleisAnyLoggedIn }) => {
  const userWallets = useUserWallets();
  const { primaryWallet } = useDynamicContext();

  useEffect(() => {
    // Call handleLoggin function whenever primaryWallet connection status changes
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

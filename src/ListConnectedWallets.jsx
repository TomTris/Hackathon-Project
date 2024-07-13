import React, { useEffect } from 'react';
import { useUserWallets, useDynamicContext } from '@dynamic-labs/sdk-react-core';

const ListConnectedWallets = ({ handleLoggin, getWallet, handleIsAnyLoggined }) => {
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

    // Check if any wallet in userWallets is connected
    if (userWallets && userWallets.length > 0) {
      for (const wallet of userWallets) {
        if (wallet.address && wallet.connected) {
          anyWalletConnected = true;
          break;
        }
      }
    }
  }, [primaryWallet, userWallets, handleLoggin, getWallet, handleIsAnyLoggined]);

  return (
    <span></span>
  );
}

export default ListConnectedWallets;

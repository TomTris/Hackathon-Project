import React, { useEffect } from 'react';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';

const ListConnectedWallets = ({ handleLoggin, getWallet }) => {
  const { primaryWallet } = useDynamicContext();

  useEffect(() => {
    // Call handleLoggin function whenever primaryWallet connection status changes
    if (primaryWallet && primaryWallet.connected) {
      handleLoggin(true);
    } else {
      handleLoggin(false);
    }
    getWallet(primaryWallet);
  }, [primaryWallet, handleLoggin]);

  return (
    <></>
  );
}

export default ListConnectedWallets;

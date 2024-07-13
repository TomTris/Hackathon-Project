import React, { useEffect } from 'react';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';

const ListConnectedWallets = ({ handleLoggin }) => {
  const { primaryWallet } = useDynamicContext();

  useEffect(() => {
    // Call handleLoggin function whenever primaryWallet connection status changes
    if (primaryWallet && primaryWallet.connected) {
      handleLoggin(true);
    } else {
      handleLoggin(false);
    }
  }, [primaryWallet, handleLoggin]);

  return (
    <div>
      <h2>Primary Wallet</h2>
      {primaryWallet ? (
        <p>
          {primaryWallet.address}: {primaryWallet.connected ? 'Connected' : 'Not connected'}
        </p>
      ) : (
        <p>No primary wallet connected</p>
      )}
    </div>
  );
}

export default ListConnectedWallets;

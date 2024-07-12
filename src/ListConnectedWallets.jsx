import React from 'react'
import { useUserWallets, useDynamicContext } from '@dynamic-labs/sdk-react-core'

const ListConnectedWallets = () => {
  const userWallets = useUserWallets()
  const { primaryWallet } = useDynamicContext()

  return (
    <div>
      <h1>Connected wallets</h1>
      {userWallets.map((wallet) => (
        <p key={wallet.id}>
          {wallet.address}: {wallet.connected ? 'Connected' : 'Not connected'}
        </p>
      ))}

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
    </div>
  )
}

export default ListConnectedWallets
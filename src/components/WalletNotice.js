import React, { useEffect, useState } from 'react';

function WalletNotice({primaryWallet, isLoggedIn}) {
	return (
	  <div className="container mx-auto p-4">
		<h2 className="text-2xl font-bold mb-4">No Wallet found.. :/</h2>
		<p>U may click the Login or select a wallet once wour E-Mail shows up</p>
	  </div>
	);
  }

export default WalletNotice;

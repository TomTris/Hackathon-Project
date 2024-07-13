import React, { useEffect, useState } from 'react';

function LoginNotice({primaryWallet, isLoggedIn, isAnyLoggedIn}) {
	return (
	  <div className="container mx-auto p-4">
		<h2 className="text-2xl font-bold mb-4">Plaese Log in .. :/</h2>
		<p>Create or sign in to the Wallet of ur choice - Powered by dynamic</p>
	  </div>
	);
  }

export default LoginNotice;

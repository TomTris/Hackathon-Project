import React, { useEffect, useState } from 'react';
import HomeContent from '../components/HomeContent';
import WalletNotice from '../components/WalletNotice';

function Home({primaryWallet, isLoggedIn}) {
	return (
		<div>{primaryWallet ? <HomeContent /> : <WalletNotice />}</div>
	);
  }

export default Home;

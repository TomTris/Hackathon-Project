import React from 'react';
import HomeContent from '../components/HomeContent';
import WalletNotice from '../components/WalletNotice';

function Home({ primaryWallet, isLoggedIn, isAnyLoggedIn, categories, projects }) {
  return (
    <div>
      {isLoggedIn ? (
        <HomeContent primaryWallet={primaryWallet} categories={categories} projects={projects} />
      ) : isAnyLoggedIn ? (
        <WalletNotice />
      ) : null}
    </div>
  );
}

export default Home;
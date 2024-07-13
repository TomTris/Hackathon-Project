import React from 'react';
import HomeContent from '../components/HomeContent';
import WalletNotice from '../components/WalletNotice';
import LoginNotice from '../components/LoginNotice';

function Home({ primaryWallet, isLoggedIn, isAnyLoggedIn, categories, projects }) {
  return (
    <div>
      {isLoggedIn ? <HomeContent primaryWallet={primaryWallet} categories={categories} projects={projects} /> : (isAnyLoggedIn ? <WalletNotice /> : <LoginNotice />)}
    </div>
  );
}

export default Home;
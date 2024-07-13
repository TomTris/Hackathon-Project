
// import React from 'react';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import Home from './pages/Home';
import Nav from './components/Nav';
import { DynamicContextProvider, DynamicWidget } from '@dynamic-labs/sdk-react-core';
import { EthersExtension } from '@dynamic-labs/ethers-v6';
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';
import ListConnectedWallets from './ListConnectedWallets';
import CreateProject from './pages/CreateProject';
import NoPage from './pages/NoPage'

function App() {
  const [isLoggined, setLoggined] = useState(false);
  const [primaryWallet, setWallet] = useState(null);

  const handleLoggin = (newState) => {
    setLoggined(newState);
  }
  const getWallet = (wallet) => {
    setWallet(wallet);
  }
  
  return (
    <div className="App">
      <DynamicContextProvider
        settings={{
          environmentId: '5bf6243b-192f-4aec-8ff3-6d784f64de3c',
          walletConnectorExtensions: [EthersExtension],
          walletConnectors: [EthereumWalletConnectors],
        }}
      >
        <Router>
          <header className="App-header bg-blue-500 text-red p-4">
            <Link
              to="/"
            >
		  <img src="/cryptofund-logo.png" width="50" heigh="50"/>
            </Link>
            <h1 className="text-2xl font-bold text-red">CRYPTOFUND</h1>
            <p>Welcome to CryptoFund, your decentralized and anonymous way of crowdfunding</p>
            <Nav primaryWallet={primaryWallet} isLoggined={isLoggined}/>
            <DynamicWidget />
          </header>
          <main className="p-4">
            <Routes>
              <Route path="/" element={<Home primaryWallet={primaryWallet} isLoggined={isLoggined}/>} />
              <Route path="/createProject" element={(primaryWallet) ? <CreateProject primaryWallet={primaryWallet}/> : <Home primaryWallet={primaryWallet} isLoggined={isLoggined}/>} />
            </Routes>
          </main>
        </Router>
        <ListConnectedWallets handleLoggin={handleLoggin} getWallet={getWallet}/>
      </DynamicContextProvider>
    </div>
  );
}

export default App;

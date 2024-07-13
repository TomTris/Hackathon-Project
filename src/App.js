import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Nav from './components/Nav';
import { DynamicContextProvider, DynamicWidget } from '@dynamic-labs/sdk-react-core';
import { EthersExtension } from '@dynamic-labs/ethers-v6';
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';
import ListConnectedWallets from './ListConnectedWallets';
import CreateProject from './pages/CreateProject';
import NoPage from './pages/NoPage';
import Category from './pages/Category';
import Project from './pages/Project';

const WalletContext = React.createContext();

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [primaryWallet, setWallet] = useState(null);
  const [isAnyLoggedIn, setAnyLoggedIn] = useState(false);
  const [categories, setCategories] = useState([]);
  const [projects, setProjects] = useState([
	{
	  name: "AI Research Project",
	  categories: ["AI", "Tech"],
	  totalFund: 100000,
	  currFund: 75000,
	  finished: false,
	  owner: "0x1234567890abcdef1234567890abcdef12345678",
	  percentage: 75,
	  moneyOwner: 75000,
	  shares: [
		{ owner: "0xabcdefabcdefabcdefabcdefabcdefabcdef", percentage: 50 },
		{ owner: "0x1234567890123456789012345678901234567890", percentage: 25 },
		{ owner: "0xfedcba0987654321098765432109876543210987", percentage: 25 }
	  ],
	  claimed: false,
	  hash: "QmW2WQi7j6c7Ug1MdQhi5opoj1buZL7gtBqFJpJ9uK7D2Z"
	},
	{
	  name: "Tech Startup Development",
	  categories: ["Tech", "Security"],
	  totalFund: 200000,
	  currFund: 50000,
	  finished: false,
	  owner: "0xabcdefabcdefabcdefabcdefabcdefabcdef",
	  percentage: 25,
	  moneyOwner: 50000,
	  shares: [
		{ owner: "0x1234567890123456789012345678901234567890", percentage: 40 },
		{ owner: "0xfedcba0987654321098765432109876543210987", percentage: 30 },
		{ owner: "0x1234567890abcdef1234567890abcdef12345678", percentage: 30 }
	  ],
	  claimed: false,
	  hash: "QmPChd2hQErCfoUyZ7nrbj5p1XbW4hvK9LpmJ1MjgkxAXh"
	},
	{
	  name: "Cybersecurity Initiative",
	  categories: ["Security"],
	  totalFund: 150000,
	  currFund: 150000,
	  finished: true,
	  owner: "0xfedcba0987654321098765432109876543210987",
	  percentage: 100,
	  moneyOwner: 150000,
	  shares: [
		{ owner: "0x1234567890123456789012345678901234567890", percentage: 50 },
		{ owner: "0xabcdefabcdefabcdefabcdefabcdefabcdef", percentage: 50 }
	  ],
	  claimed: true,
	  hash: "QmT6NbFf3sHwHfHs1K5Yc1zQsXbS6f5RXGm3oXQj7uYn9B"
	},
	{
	  name: "AI-Powered Analytics Tool",
	  categories: ["AI", "Tech"],
	  totalFund: 120000,
	  currFund: 60000,
	  finished: false,
	  owner: "0x1234567890123456789012345678901234567890",
	  percentage: 50,
	  moneyOwner: 60000,
	  shares: [
		{ owner: "0xabcdefabcdefabcdefabcdefabcdefabcdef", percentage: 60 },
		{ owner: "0x1234567890abcdef1234567890abcdef12345678", percentage: 20 },
		{ owner: "0xfedcba0987654321098765432109876543210987", percentage: 20 }
	  ],
	  claimed: false,
	  hash: "QmPChd2hQErCfoUyZ7nrbj5p1XbW4hvK9LpmJ1MjgkxAXh"
	}
  ]);

  const handleLoggin = (newState) => {
    setLoggedIn(newState);
  };
  const getWallet = (wallet) => {
    setWallet(wallet);
  };
  const handleisAnyLoggedIn = (isAvailable) => {
    setAnyLoggedIn(isAvailable);
  };

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
            <Link to="/">
              <img src="/cryptofund-logo.png" width="50" height="50" alt="CryptoFund Logo"/>
            </Link>
            <h1 className="text-2xl font-bold text-red">CRYPTOFUND</h1>
            <p>Welcome to CryptoFund, your decentralized and anonymous way of crowdfunding</p>
            <Nav primaryWallet={primaryWallet} isLoggedIn={isLoggedIn} isAnyLoggedIn={isAnyLoggedIn} />
            <DynamicWidget />
          </header>
          <main className="p-4">
            <Routes>
              <Route path="/" element={<Home primaryWallet={primaryWallet} isLoggedIn={isLoggedIn} isAnyLoggedIn={isAnyLoggedIn} categories={categories} projects={projects}/>} />
              <Route path="/createProject" element={primaryWallet ? <CreateProject primaryWallet={primaryWallet} /> : <Home primaryWallet={primaryWallet} isLoggedIn={isLoggedIn} isAnyLoggedIn={isAnyLoggedIn} />} />
              <Route path="/categories/:slug" element={<Category />} />
			  <Route path="/projects/:slug" element={<Project projects={projects} />} />
			  primaryWallet
              <Route path="*" element={<NoPage />} />
            </Routes>
          </main>
        </Router>
        <ListConnectedWallets handleLoggin={handleLoggin} getWallet={getWallet} handleisAnyLoggedIn={handleisAnyLoggedIn} />
      </DynamicContextProvider>
    </div>
  );
}

export default App;

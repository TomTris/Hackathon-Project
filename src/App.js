// import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
// import Home  from "./pages/Home"
// import Nav from "./components/Nav"
import { ethers } from 'ethers';


// import {
//   DynamicContextProvider,
//   DynamicWidget,
// } from "@dynamic-labs/sdk-react-core";
// import { EthersExtension } from "@dynamic-labs/ethers-v6";

// import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";



// const loadBlockchainData = async (setError) => {
//   try {
//     const provider = new ethers.BrowserProvider(window.ethereum);
//     const accounts = await provider.listAccounts();
//     if (accounts.length === 0) {
//       setError('No accounts found. Please check MetaMask.');
//     }
//   } catch (error) {
//     setError('Error loading accounts: ' + error.message);
//   }
// };




//   const [error, setError] = useState(null);
//   const [extensionLink, setExtensionLink] = useState('');

//   useEffect(() => {
//     const initialize = async () => {
//       if (window.ethereum) {
//         await loadBlockchainData(setError);
//       } else {
//         const browser = detectBrowser();
//         const link = getExtensionLink(browser);
//         console.log('Detected browser:', browser);
//         console.log('Extension link:', link);
//         setExtensionLink(link);
//         setError('MetaMask is not installed. Please install MetaMask to continue.');
//       }
//     };

//     initialize();
//   }, []);

//   return (
//     <div>
//       {error ? (
//         <div>
//           <p>{error}</p>
//           <a
//             type="button"
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded"
//             href={extensionLink}
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Install MetaMask
//           </a>
//         </div>
//       ) : (
//         <div>
//           <p>Blockchain data loaded successfully.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MetaMaskChecker;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Nav from './components/Nav';
import { DynamicContextProvider, DynamicWidget } from '@dynamic-labs/sdk-react-core';
import { EthersExtension } from '@dynamic-labs/ethers-v6';
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';
import ListConnectedWallets from './ListConnectedWallets';

function App() {
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
            <h1 className="text-2xl font-bold text-red">CRYPTOFUND</h1>
            <p>Welcome to CryptoFund, your decentralized and anonymous way of crowdfunding</p>
            <Nav />
            <DynamicWidget />
          </header>
          <main className="p-4">
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </main>
        </Router>
        <ListConnectedWallets />
      </DynamicContextProvider>
    </div>
  );
}

export default App;


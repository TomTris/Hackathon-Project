import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import Home  from "./pages/Home"
import Nav from "./components/Nav"
import { ethers } from 'ethers';

function App() {
  return (
    <div className="App">
      <Router >
        <header className="App-header bg-blue-500 text-red p-4">
          <h1 className="text-2xl font-bold text-red">CRYPTOFUND</h1>
          <p>Welcome to CryptoFund, your decentralized and anonymous way of croudfunding</p>
          <Nav />
        </header>
        <main className="p-4">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;

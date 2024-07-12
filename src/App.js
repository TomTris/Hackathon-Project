import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import Home  from "./pages/Home"
import Nav from "./components/Nav"
import { ethers } from 'ethers';

function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header bg-blue-500 text-white p-4">
          <h1 className="text-2xl font-bold">CRYPTOFUND</h1>
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

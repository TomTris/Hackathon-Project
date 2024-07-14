import React from 'react';
import Transaction from "./components/Transaction";
import MetaMaskChecker from './components/MetaMaskChecker';
import { WalletProvider } from './contexts/WalletContext';
import { ContractProvider } from './contexts/ContractContext';
import Title from './components/Title';
import Transactions from './components/Transactions';


function App() {
    return (
        <WalletProvider>
            <ContractProvider>
                <div className="bg-gray-200 minheight100 width100">
                    <header className="p-4 bg-gray-200 fixed w-screen flex-col gap-5">
                        <Title />
                        <MetaMaskChecker />
                    </header>
					<Transactions />
                </div>
            </ContractProvider>
        </WalletProvider>
    );
}

export default App;
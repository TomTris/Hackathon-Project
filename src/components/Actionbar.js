import React, { useState, useEffect, useContext } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';
import { blockscout, contractABI, contractAddress } from '../contract.config';
import ActionForm from './ActionForm';
import { ContractContext } from '../contexts/ContractContext';
import { WalletContext } from '../contexts/WalletContext';

function Actionbar() {
    const [error, setError] = useState(null);
    const { contract, setContract } = useContext(ContractContext);
    const { setWallet } = useContext(WalletContext);

    useEffect(() => {
        const init = async () => {
            if (window.ethereum) {
                try {
                    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
					if(accounts[0]){
						setWallet(accounts[0]); 
					}
                    const provider = new ethers.BrowserProvider(window.ethereum);
                    const contractInstance = new ethers.Contract(contractAddress, contractABI, provider);
                    setContract(contractInstance);
                } catch (err) {
                    setError('Error loading contracts: ' + err.message);
                }
            } else {
                setError('MetaMask is not installed. Please install it to use this app.');
            }
        };
        init();
    }, [setContract, setWallet]);

    return (
        <div className='w-full max-w-md mx-auto'>
            {contract ? (
                <ActionForm />
            ) : (
                <p>App Contract did not load</p>
            )}
            {error && <p>{error}</p>}
        </div>
    );
}

export default Actionbar;

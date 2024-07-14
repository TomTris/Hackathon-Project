import React, { useState, useEffect, useContext } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';
import { ContractContext } from '../contexts/ContractContext';
import { eth_rate_blockscout, contractABI, contractAddress } from '../contract.config';

function ActionForm() {
    const [ethToUsdRate, setEthToUsdRate] = useState(0);
    const [giftValid, setGiftValid] = useState(false);
    const { contract, setContract } = useContext(ContractContext);
    const [error, setError] = useState(null);
    const [seconds, setSeconds] = useState(60);
    const [gift, setGift] = useState({ address: '', message: '', amount: ''});

    async function callGetMoney() {
        try {
            const tx = await contract.getMoney(gift.message, {
                value: ethers.parseEther(gift.amount.toString())
            });
            await tx.wait();
            console.log('Transaction successful:', tx);
        } catch (err) {
            console.error('Transaction failed:', err);
            setError('Transaction failed: ' + err.message);
        }
    }

    async function submitGift() {
        await callGetMoney();
    }

    function ethtowei(eth) {
        return eth * Math.pow(10, 18);
    }

    function weitoeth(wei) {
        return wei / Math.pow(10, 18);
    }

    function isAddressValid(address) {
        const regex = /^0x[a-fA-F0-9]{40}$/;
        return regex.test(address.trim());
    }

    const checkGiftValid = (updatedGift) => {
        let isValid = true;

        if (!isAddressValid(updatedGift.address)) {
            isValid = false;
        }

        if (isNaN(parseFloat(updatedGift.amount)) || parseFloat(updatedGift.amount) <= 0) {
            isValid = false;
        }

        if (updatedGift.message.trim() === '') {
            isValid = false;
        }

        setGiftValid(isValid);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        let updatedGift = { ...gift, [name]: value };

        if (name === 'amount') {
            updatedGift = { ...gift, [name]: ethtowei(parseFloat(value)) };
        }

        setGift(updatedGift);
        checkGiftValid(updatedGift);
    };

    useEffect(() => {
        const init = async () => {
            if (window.ethereum) {
                try {
                    await window.ethereum.request({ method: 'eth_requestAccounts' });
                    const provider = new ethers.BrowserProvider(window.ethereum);
                    const signer = provider.getSigner();
                    const contract = new ethers.Contract(contractAddress, contractABI, signer);
                    setContract(contract);
                } catch (err) {
                    setError('Error loading contracts: ' + err.message);
                }
            } else {
                setError('MetaMask is not installed. Please install it to use this app.');
            }
        };
        init();
    }, [setContract]);

    useEffect(() => {
        const fetchEthToUsdRate = async () => {
            try {
                const response = await axios.get(eth_rate_blockscout);
                const ethData = response.data.result;
                setEthToUsdRate(parseFloat(ethData.ethusd));
            } catch (error) {
                console.error('Error fetching the ETH to USD rate:', error);
            }
        };

        fetchEthToUsdRate();
        const interval = setInterval(() => {
            fetchEthToUsdRate();
            setSeconds(60);
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const countdown = setInterval(() => {
            setSeconds((prev) => (prev > 0 ? prev - 1 : 60));
        }, 1000);

        return () => clearInterval(countdown);
    }, []);

    return (
        <div className='w-full max-w-md mx-auto flex gap-5'>
            <div className='flex-col  gap-5'>
                <label className="flex flex-col">
                    <span className="font-semibold mb-2">Address</span>
                    <input className="bg-gray-100 p-2 rounded" type="text" name="address" value={gift.address} onChange={handleChange} />
                </label>
                <label className="flex flex-col">
                    <span className="font-semibold mb-2">Own Invest</span>
                    <input
                        type="number"
                        className="bg-gray-100 p-2 rounded"
                        name="amount"
                        value={weitoeth(gift.amount)}
                        onChange={handleChange}
                        step="0.0001"
                        min="0"
                        placeholder="Your share in ETH"
                    />
                    <div className="flex flex-col mt-2">
                        <strong className="text-lg">{(weitoeth(gift.amount) * ethToUsdRate).toFixed(2)} $</strong>
                        <span className="text-sm text-gray-500">1 ETH / {ethToUsdRate}$ currently (update in {seconds}s)</span>
                    </div>
                </label>
            </div>
            <div className='flex-col  gap-5'>
                <label className="flex flex-col">
                    <span className="font-semibold mb-2">Message</span>
                    <textarea className="bg-gray-100 p-2 rounded" name="message" value={gift.message} onChange={handleChange}></textarea>
                </label>
                <button onClick={submitGift} className="w-full bg-green-500 shadow-md rounded-lg p-4 text-white hover:cursor-pointer hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    disabled={!giftValid}>
                    Send
                </button>
            </div>
            {error && <div className="text-red-500 mt-4">{error}</div>}
        </div>
    );
}

export default ActionForm;

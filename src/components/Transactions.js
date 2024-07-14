import React, { useState, useContext, useEffect } from 'react';
import Transaction from './Transaction';
import axios from 'axios';
import { blockscout } from '../contract.config';
import { WalletContext } from '../contexts/WalletContext';

function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const { wallet } = useContext(WalletContext);

    useEffect(() => {
        const loadTransactions = async () => {
            if (!wallet) {
                console.error("Wallet address not set");
                return;
            }

            try {
                const response = await axios.get(`${blockscout}transactions`, {
                    headers: {
                        'Accept': 'application/json'
                    },
                    params: {
                        module: 'account',
                        action: 'txlist',
                        address: wallet,
                        startblock: 0,
                        endblock: 99999999,
                        sort: 'asc'
                    }
                });
                setTransactions(response.data.result || []);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };

        loadTransactions();
    }, [wallet]);

    return (
        <ul className="p-4 flex flex-col gap-5 pt-40">
            {transactions.map((transaction, index) => (
                <Transaction
                    key={transaction.hash}
                    person={transaction.from}
                    reason={transaction.method}
                    amount={transaction.value}
                    time={transaction.timestamp}
                />
            ))}
        </ul>
    );
}

export default Transactions;

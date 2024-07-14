import React from 'react';
import { useState, useContext, useEffect } from 'react'
import Transaction from './Transaction';
import axios from 'axios';
import { blockscout } from '../contract.config';
import { WalletContext } from '../contexts/WalletContext';

function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const { wallet } = useContext(WalletContext);
    useEffect(() => {
        const loadTransactions = async () => {
            try {
				const response = await axios.get(`${blockscout}/addresses/${wallet}/transactions`, {
					headers: {
						'Accept': 'application/json'
					}
				});
				console.log(response.data);
				setTransactions(response)
			} catch (error) {
                console.error('Error fetching the ETH to USD rate:', error);
            }
        };
		loadTransactions();
    }, []);

	return (
		<ul className="p-4 flex flex-col gap-5 pt-40">
		{transactions.map((transaction, index) => (
			<Transaction
				key={index}
				person={transaction.person}
				reason={transaction.reason}
				amount={transaction.amount}
				time={transaction.time}
			/>
		))}
	</ul>
	);
}

export default Transactions;

import React, { useContext } from 'react';
import { WalletContext } from '../contexts/WalletContext';

const Title = () => {
    const { wallet } = useContext(WalletContext);
    return (
        <h1 className="text-2xl text-center font-bold">
            {wallet ? wallet : 'No Wallet Connected'}
        </h1>
    );
};

export default Title;
import React, { createContext, useState } from 'react';

export const ContractContext = createContext();

export const ContractProvider = ({ children }) => {
    const [contract, setContract] = useState('ContractDataHere');

    return (
        <ContractContext.Provider value={{ contract, setContract }}>
            {children}
        </ContractContext.Provider>
    );
};
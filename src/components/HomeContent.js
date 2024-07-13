
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Link} from 'react-router-dom';

function HomeContent({ primaryWallet, isLoggedIn }) {
    const categories = [
        "Achtung sdifsd fsdfk jsdlf",
        "sdasd as as",
        "sdfsdfsdf sd sd"
    ];

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Categories</h2>
			<div className="grid grid-cols-4 gap-5">
                {categories.map((category, index) => (
                        <div className="category-box p-4 shadow-lg rounded-lg bg-gray-500 text-white hover:bg-black transition duration-300 ease-in-out">
                            {category}
                        </div>
                ))}
            </div>
	  </div>
    );
}

export default HomeContent;
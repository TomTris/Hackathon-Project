import React, { useEffect, useState } from 'react';

function HomeContent({primaryWallet, isLoggedIn}) {
	return (
	  <div className="container mx-auto p-4">
		<h2 className="text-2xl font-bold mb-4">Categories</h2>
		<div className="grid grid-cols-4 gap-5">
			<div className="category-box p-4 shadow-lg rounded-lg bg-gray-500 text-white hover:bg-black transition duration-300 ease-in-out">Category 1</div>
            <div className="category-box p-4 shadow-lg rounded-lg bg-gray-500 text-white hover:bg-black transition duration-300 ease-in-out">Category 2</div>
            <div className="category-box p-4 shadow-lg rounded-lg bg-gray-500 text-white hover:bg-black transition duration-300 ease-in-out">Category 3</div>
            <div className="category-box p-4 shadow-lg rounded-lg bg-gray-500 text-white hover:bg-black transition duration-300 ease-in-out">Category 4</div>
            <div className="category-box p-4 shadow-lg rounded-lg bg-gray-500 text-white hover:bg-black transition duration-300 ease-in-out">Category 5</div>
            <div className="category-box p-4 shadow-lg rounded-lg bg-gray-500 text-white hover:bg-black transition duration-300 ease-in-out">Category 6</div>
            <div className="category-box p-4 shadow-lg rounded-lg bg-gray-500 text-white hover:bg-black transition duration-300 ease-in-out">Category 7</div>
            <div className="category-box p-4 shadow-lg rounded-lg bg-gray-500 text-white hover:bg-black transition duration-300 ease-in-out">Category 8</div>
            <div className="category-box p-4 shadow-lg rounded-lg bg-gray-500 text-white hover:bg-black transition duration-300 ease-in-out">Category 9</div>
            <div className="category-box p-4 shadow-lg rounded-lg bg-gray-500 text-white hover:bg-black transition duration-300 ease-in-out">Category 10</div>
            <div className="category-box p-4 shadow-lg rounded-lg bg-gray-500 text-white hover:bg-black transition duration-300 ease-in-out">Category 11</div>
            <div className="category-box p-4 shadow-lg rounded-lg bg-gray-500 text-white hover:bg-black transition duration-300 ease-in-out">Category 12</div>
		</div>
	  </div>
	);
  }

export default HomeContent;

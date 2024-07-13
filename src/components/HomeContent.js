import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { slugString } from '../helpers/frontendHelper';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ethers } from 'ethers';
import { FUNDING_ABI, FUNDING_ADDRESS } from './../contract.config';

function HomeContent({ primaryWallet, isLoggedIn, projects }) {
  const [categories, setCategories] = useState([]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  useEffect(() => {
    const fetchCategories = async () => {
      if (primaryWallet && primaryWallet.connector && primaryWallet.connector.ethers) {
        try {
         // const provider = primaryWallet.connector.ethers.getProvider();
		  const provider = new ethers.BrowserProvider(window.ethereum);
		  console.log("provider")
		  console.log(provider)
          const contract = new ethers.Contract(FUNDING_ADDRESS, FUNDING_ABI, provider);
		  console.log("contract")
		  console.log(contract)
          const categoriesFromContract = await contract.getCategories();
		  console.log("categoriesFromContract")
		  console.log(categoriesFromContract)
          setCategories(categoriesFromContract);
        } catch (error) {
          console.error('Fehler beim Abrufen der Kategorien:', error);
        }
      }
    };

    fetchCategories();
  }, [primaryWallet]);

  const getProjectsByCategory = (category) => {
    return projects.filter(project => project.categories.includes(category)).slice(0, 10);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      <div className="grid grid-cols-1 gap-5">
          <div className="category-box p-4 shadow-lg rounded-lg bg-gray-500 text-white hover:bg-black transition duration-300 ease-in-out"
            style={{ width: '20vw', height: '20vw'}}>
            <div>
              {/* <Slider {...sliderSettings}>
                  <div   className="p-2">
                      <div className="project-box p-4 shadow-lg rounded-lg bg-gray-300 text-black hover:bg-gray-400 transition duration-300 ease-in-out">
                        Boxes
                      </div>
                  </div>
              </Slider> */}
            </div>
          </div>
      </div>
    </div>
  );
}
export default HomeContent;

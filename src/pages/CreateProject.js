import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CreateProject({activeWallet}) {
  const API_URL = process.env.REACT_APP_BLOCKSCOUT_URL_SHORT + '?module=stats&action=ethprice';
  const [projectValid, setProjectValid] = useState(false);
  const [project, setProject] = useState({ name: '', totalFund: '' });
  const [ethToUsdRate, setEthToUsdRate] = useState(0);
  const [seconds, setSeconds] = useState(60);

  const checkProjectValid = (updatedProject) => {
	setProjectValid(true);
    if (updatedProject.name.trim() === '') {
      setProjectValid(false);
    }
	console.log(parseFloat(updatedProject.totalFund));
	if (isNaN(parseFloat(updatedProject.totalFund)) || parseFloat(updatedProject.totalFund) <= 0) {
		setProjectValid(false);
    } 
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedProject = { ...project, [name]: value };

    if (name === 'totalFund') {
      const regex = /^\d*\.?\d{0,18}$/;
      if (value === '' || regex.test(value)) {
        setProject(updatedProject);
        checkProjectValid(updatedProject);
      }
    } else {
      setProject(updatedProject);
      checkProjectValid(updatedProject);
    }
  };

  useEffect(() => {
    const fetchEthToUsdRate = async () => {
      try {
        const response = await axios.get(API_URL);
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
  }, [API_URL]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  return (
    <div>
      <form className="flex flex-col">
        <label className="flex flex-col">
          Owner Wallet
          <input
            type="text"
            name="name"
            value={project.name}
            onChange={handleChange}
            placeholder="Name your Idea"

          />
        </label>
        <label className="flex flex-col">
          Project Name
          <input
            type="text"
            name="name"
            value={project.name}
            onChange={handleChange}
            placeholder="Name your Idea"
          />
        </label>
        <label className="flex flex-col">
          Fund
          <input
            type="number"
            name="totalFund"
            value={project.totalFund}
            onChange={handleChange}
            step="0.000000000000000001"
            min="0"
            placeholder="Total Fund"
          />
          <div className="flex flex-col">
            <strong>{(project.totalFund * ethToUsdRate).toFixed(2)} $</strong>
            <span>1 ETH / {ethToUsdRate}$ currently (update in {seconds}s)</span>
          </div>
        </label>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={!projectValid}
        >
          Add Project
        </button>
      </form>
    </div>
  );
}

export default CreateProject;

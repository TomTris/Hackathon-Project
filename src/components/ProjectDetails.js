import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { weitoeth, ethtowei } from '../helpers/frontendHelper';
import ETHChart from './charts/ETHChart';


function ProjectDetails({ project, primaryWallet }) {
  const API_URL = process.env.REACT_APP_BLOCKSCOUT_URL_SHORT + '?module=stats&action=ethprice';
  const [projectValid, setProjectValid] = useState(false);
  const [ch_project, setProject] = useState(project);
  const [ethToUsdRate, setEthToUsdRate] = useState(0);
  const [seconds, setSeconds] = useState(60);

  const checkProjectValid = (updatedProject) => {
    setProjectValid(true);
    if (updatedProject.name.trim() === '') {
      setProjectValid(false);
    }
    if (isNaN(parseFloat(updatedProject.totalFund)) || parseFloat(updatedProject.totalFund) <= 0) {
      setProjectValid(false);
    }
    if (isNaN(parseFloat(updatedProject.percentage)) || parseFloat(updatedProject.percentage) <= 29.99) {
      setProjectValid(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    let updatedProject = { ...ch_project, [name]: value };

    if (name === 'totalFund' || name === 'moneyOwner') {
      updatedProject = { ...updatedProject, [name]: ethtowei(parseFloat(value)) };
    }

    updatedProject.percentage = (updatedProject.moneyOwner / updatedProject.totalFund) * 100;
    setProject(updatedProject);
    checkProjectValid(updatedProject);
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
    <div className="p-6 bg-white rounded shadow-md">
	<h1>{project.name} - Your awesome Project</h1>
	<ETHChart />
      <form className="flex flex-col space-y-4">
        <label className="flex flex-col">
          <span className="font-semibold mb-2">Refund</span>
          <input
            type="number"
            className="bg-gray-100 p-2 rounded"
            name="refund"
            value={weitoeth(ch_project.refund)}
            onChange={handleChange}
            step="0.000000000000000001"
            min="0"
            placeholder="Total Fund in ETH"
          />
          <div className="flex flex-col mt-2">
            <strong className="text-lg">{(weitoeth(ch_project.totalFund) * ethToUsdRate).toFixed(2)} $</strong>
            <span className="text-sm text-gray-500">1 ETH / {ethToUsdRate}$ currently (update in {seconds}s)</span>
          </div>
        </label>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={!projectValid}
        >
          Refund
        </button>
      </form>
    </div>
  );
}


export default ProjectDetails;

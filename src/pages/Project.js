import React, { useContext } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { WalletContext } from '../contexts/WalletContext';

function Project() {
  const { slug } = useParams();
  const location = useLocation();
  const { primaryWallet } = useContext(WalletContext);
  const project = location.state?.project;

  return (
    <div>
      <Link to="/">
        <button>Back to Categories</button>
      </Link>
      <div>
        <h2>Primary Wallet Address: {primaryWallet?.address}</h2>
        <h2>Project Address: {project?.address}</h2>
      </div>
    </div>
  );
}

export default Project;
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';

function Nav({ primaryWallet, isLoggedIn }) {
  const location = useLocation();

  const getLinkClass = (path) => {
    return location.pathname === path ? 'text-red-500' : '';
  };

  return (
    primaryWallet && (
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link
              to="/createProject"
              className={getLinkClass('/createProject')}
            >
              Create Project
            </Link>
          </li>
        </ul>
      </nav>
    )
  );
}

export default Nav;

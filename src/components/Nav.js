import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';

function Nav() {
	const location = useLocation();
  
	const getLinkClass = (path) => {
	  return location.pathname === path ? 'text-red-500' : '';
	};
  
	return (
	  <nav>
		<ul className="flex space-x-4">
		  <li>
			<Link
			  to="/"
			  className={getLinkClass('/')}
			>
			  Home
			</Link>
		  </li>
		  <li>
			<Link
			  to="/about"
			  className={getLinkClass('/about')}
			>
			  About
			</Link>
		  </li>
		  <li>
			<Link
			  to="/contact"
			  className={getLinkClass('/contact')}
			>
			  Contact
			</Link>
		  </li>
		</ul>
	  </nav>
	);
  }

export default Nav;
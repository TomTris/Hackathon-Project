import React, { useEffect, useState } from 'react';
import { Link,  useParams, useLocation } from 'react-router-dom';


function Category() {
	const { slug } = useParams();
	const location = useLocation();
	const category = location.state?.category;
	const projects = location.state?.projects;
	return (
		<div>
		<Link to="/">
		<button>Back to Categories</button>
		</Link>
			<h1>{category}</h1>

		</div>
	);
  }

export default Category;

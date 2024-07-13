import React, { useEffect, useState } from 'react';
import ETHChart from './charts/ETHChart';

function ProjectDetails({project}) {
	return (
	  <div>
		<h1>{project.name} - Your awesome Project</h1>
		<ETHChart />
	  </div>
	);
  }

export default ProjectDetails;

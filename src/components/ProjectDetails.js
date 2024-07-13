import React, { useEffect, useState } from 'react';

function ProjectDetails({project}) {
	return (
	  <div>
		<h1>{project.name} - Your awesome Project</h1>
	  </div>
	);
  }

export default ProjectDetails;

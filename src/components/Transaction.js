import React from 'react';
import Positive from './Positive';
import Negative from './Negative';

function Transaction({ person, reason, ammount, time}) {
	return (
		<li className="bg-white shadow-md rounded-lg p-4 flex flex-row justify-between items-center">
		  <div>
		  	<h2 className="text-1.5xl font-bold">{person}</h2>
			<p className="text-0.6 text-grey-100">{reason}</p>
		  </div>
		  <div>
				{(ammount >= 0) ? <Positive ammount={ammount}/> : <Negative  ammount={ammount}/>}
		  </div>
		</li>
	);
}

export default Transaction;

import React from 'react';
import { Link } from 'react-router-dom';
// import { useParams } from 'react-router';

import './Error.css';

const Error = () => {
	// const { id } = useParams();
	return (
		<div className="error_container">
			<h1>404</h1>
			<h2>Oups! La page que vous demandez n'existe pas.</h2>
			<Link to={``} className="error_link">
				Retourner sur la page d'accueil
			</Link>
		</div>
	);
};

export default Error;

import React from 'react';
import { useParams } from 'react-router';

import Header from '../../components/Header/Header';
import VerticalMenu from '../../components/VerticalMenu/VerticalMenu';
import Error from '../../components/Error/Error';

import Dashboard from '../Dashboard/Dashboard';

import './Home.css';

/**
 * Display the Home component
 * @returns {React.Component} Home component
 */
const Home = () => {
	/* Get the user id from the url */
	const { id } = useParams();

	/* Check if the user id is valid  and display the Dashboard / Error component */
	return (
		<div className="dashboard">
			<Header />
			<div className="main">
				<VerticalMenu />
				{id === '12' || id === '18' ? <Dashboard /> : <Error />}
			</div>
		</div>
	);
};

export default Home;

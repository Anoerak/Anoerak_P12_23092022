import React from 'react';
import { useParams } from 'react-router';

import Header from '../../components/Header/Header';
import VerticalMenu from '../../components/VerticalMenu/VerticalMenu';
import Error from '../../components/Error/Error';

import Dashboard from '../Dashboard/Dashboard';

import './Home.css';

const Home = () => {
	/**
	 * Get the user id from the url
	 * @type {Object}
	 * @property {string} id - user id
	 */
	const { id } = useParams();

	/**
	 * Display the header
	 * Display the vertical menu
	 * Display the dashboard
	 * @returns {React.Component}  React component
	 */
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

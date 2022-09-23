import React from 'react';
import { useLocation, useParams } from 'react-router';

import Header from '../../components/Header/Header';
import VerticalMenu from '../../components/VerticalMenu/VerticalMenu';
import Error from '../../components/Error/Error';

import Dashboard from '../Dashboard/Dashboard';

import './Home.css';

const Home = () => {
	const { id } = useParams();
	const { pathname } = useLocation();

	return (
		<div className="dashboard">
			<Header />
			<div className="main">
				<VerticalMenu />
				{pathname === `/user/${id}` ? <Dashboard /> : <Error />}
			</div>
		</div>
	);
};

export default Home;

import React, { useContext } from 'react';
import { useLocation } from 'react-router';

import { UserContext } from '../../utils/context/userContext';

import Header from '../../components/Header/Header';
import VerticalMenu from '../../components/VerticalMenu/VerticalMenu';
import Error from '../../components/Error/Error';

import Dashboard from '../Dashboard/Dashboard';

import './Home.css';

const Home = () => {
	const [user] = useContext(UserContext);
	const { pathname } = useLocation();

	return (
		<div className="dashboard">
			<Header />
			<div className="main">
				<VerticalMenu />
				{pathname === `/user/${user}` ? <Dashboard /> : <Error />}
			</div>
		</div>
	);
};

export default Home;

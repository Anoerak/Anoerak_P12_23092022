import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router';

import './Dashboard.css';

import useFetch from '../../utils/hooks/hook';
import { UserContext } from '../../utils/context/userContext';

import Loader from '../../components/Loader/Loader';
import KeyDatas from '../../components/KeyDatas/KeyDatas';
import AverageSessionGraph from '../../components/Graphs/AverageSessionGraph/AverageSessionGraph';
import PerformanceGraph from '../../components/Graphs/PerformanceGraph/PerformanceGraph';
import ActivityGraph from '../../components/Graphs/ActivityGraph/ActivityGraph';
import ScoreGraph from '../../components/Graphs/ScoreGraph/ScoreGraph';

/**
 * Display the Dashboard component
 * @see module:useFetch
 * @returns {React.Component}  React component
 */
const Dashboard = () => {
	/* Get the user id from the url */
	const { id } = useParams();

	/* Fetch the user data based on the user id (params {id}) */
	const { data, isError, loading, errorMessage } = useFetch(id);
	const user = data;
	const error = errorMessage;

	/* Get the user data from the context */
	const [userId, setUserId] = useContext(UserContext);

	/* Set the user id in the context */
	useEffect(() => {
		setUserId(id);
	}, [id, setUserId]);

	//
	return (
		<div key={userId} className="content">
			{isError ? (
				<div className="error">
					Une erreur est survenue lors du chargement des données : <br /> {error && error}
				</div>
			) : loading ? (
				<Loader />
			) : (
				<div className="dashboard__screen">
					<div className="dashboard__header">
						<h1>
							Bonjour <span className="userName">{user.userInfos.firstName}</span>
						</h1>
						<h2>Félicitations! Vous avez explosé vos objectifs hier 👏🏼</h2>
					</div>
					<div className="dashboard__content">
						<div className="dashboard__graphs">
							<ActivityGraph />
							<div className="dashboard__graphs__bottom">
								<AverageSessionGraph />
								<PerformanceGraph />
								<ScoreGraph />
							</div>
						</div>
						<KeyDatas />
					</div>
				</div>
			)}
		</div>
	);
};

export default Dashboard;

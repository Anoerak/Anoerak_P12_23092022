/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';

import './Dashboard.css';

import { UserContext } from '../../utils/context/userContext';

import Loader from '../../components/Loader/Loader';
import KeyDatas from '../../components/KeyDatas/KeyDatas';
import AverageSessionGraph from '../../components/Graphs/AverageSessionGraph/AverageSessionGraph';
import PerformanceGraph from '../../components/Graphs/PerformanceGraph/PerformanceGraph';
import ActivityGraph from '../../components/Graphs/ActivityGraph/ActivityGraph';
import ScoreGraph from '../../components/Graphs/ScoreGraph/ScoreGraph';

import { FetchDatas } from '../../API/fetchDatas';

/**
 * Display the Dashboard component
 * @see module:ActivityGraphProps
 * @see module:AverageSessionGraphProps
 * @see module:PerformanceGraphProps
 * @see module:TodayScoreGraphProps
 * @returns {React.Component}  React component
 */

const Dashboard = () => {
	/* Get the user id from the url */
	const { id } = useParams();

	/* Set the states for the props which will be passed to the components */
	const [user, setUserDatas] = useState([]);
	const [activity, setActivityDatas] = useState([]);
	const [{ loading, isError, errorMessage }, setLoadingError] = useState({
		loading: true,
		isError: false,
		errorMessage: '',
	});
	const [performance, setPerformanceDatas] = useState([]);
	const [averageSession, setAverageSessionDatas] = useState([]);
	const [todayScore, setTodayScoreDatas] = useState([]);

	/* Get the user datas from the API and watch any change of the {id}*/
	useEffect(() => {
		const fetchDatas = new FetchDatas();

		const userDatas = fetchDatas.getUserDatas(id);
		const userDatasPromise = userDatas.then((data) => {
			setUserDatas(data);
			setLoadingError({ loading: data[1], isError: data[2], errorMessage: data[3] });
		});

		/* Get the activity datas from the API and watch any change of the {id}*/
		const activityDatas = fetchDatas.getActivityDatas(id, 'activity');
		const activityDatasPromise = activityDatas.then((activity) => {
			setActivityDatas(activity);
		});

		/* Get the average-sessions datas from the API and watch any change of the {id}*/
		const averageSessionDatas = fetchDatas.getActivityDatas(id, 'average-sessions');
		const averageSessionDatasPromise = averageSessionDatas.then((sessions) => {
			setAverageSessionDatas(sessions);
		});

		/* Get the performance datas from the API and watch any change of the {id}*/
		const performanceDatas = fetchDatas.getActivityDatas(id, 'performance');
		const performanceDatasPromise = performanceDatas.then((performance) => {
			setPerformanceDatas(performance);
		});

		/* Get the today-score datas from the API and watch any change of the {id}*/
		const todayScoreDatas = fetchDatas.getTodayScoreDatas(id);
		const todayScoreDatasPromise = todayScoreDatas.then((todayScore) => {
			setTodayScoreDatas(todayScore);
		});
	}, [id]);

	/* Set the state for the userId from the UserContext */
	const [userId, setUserId] = useContext(UserContext);

	/* Watch for any change of the {userId} */
	useEffect(() => {
		setUserId(id);
	}, [id, setUserId]);

	//
	return (
		<div key={userId} className="content">
			{isError ? (
				<div className="error">
					Une erreur est survenue lors du chargement des données : <br /> {errorMessage && errorMessage}
				</div>
			) : loading ? (
				<Loader />
			) : (
				<div className="dashboard__screen">
					<div className="dashboard__header">
						<h1>
							Bonjour <span className="userName">{user[0].userInfos.firstName}</span>
						</h1>
						<h2>Félicitations! Vous avez explosé vos objectifs hier 👏🏼</h2>
					</div>
					<div className="dashboard__content">
						<div className="dashboard__graphs">
							<ActivityGraph
								datas={activity}
								loading={loading}
								isError={isError}
								errorMessage={errorMessage}
							/>
							<div className="dashboard__graphs__bottom">
								<AverageSessionGraph
									datas={averageSession}
									loading={loading}
									isError={isError}
									errorMessage={errorMessage}
								/>
								<PerformanceGraph
									datas={performance}
									loading={loading}
									isError={isError}
									errorMessage={errorMessage}
								/>
								<ScoreGraph
									datas={todayScore}
									score={user[0].todayScore}
									loading={loading}
									isError={isError}
									errorMessage={errorMessage}
								/>
							</div>
						</div>
						<KeyDatas
							datas={user[0].keyData}
							loading={loading}
							isError={isError}
							errorMessage={errorMessage}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default Dashboard;

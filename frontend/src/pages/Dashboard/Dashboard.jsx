import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import useFetch from '../../utils/hooks/hook';
import { UserContext } from '../../utils/context/userContext';

import Loader from '../../components/Loader/Loader';
import KeyDatas from '../../components/KeyDatas/KeyDatas';

import './Dashboard.css';

const Dashboard = () => {
	const { id } = useParams();
	const { data, isError, loading, errorMessage } = useFetch(`http://localhost:8080/user/`, id);
	const user = data;
	const error = errorMessage;
	const [userId, setUserId] = useContext(UserContext);

	useEffect(() => {
		setUserId(id);
	}, [id, setUserId]);

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
						<KeyDatas />
					</div>
				</div>
			)}
		</div>
	);
};

export default Dashboard;

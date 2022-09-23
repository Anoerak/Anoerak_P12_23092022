import React, { useContext } from 'react';

import caloryImg from '../../assets/icons/calories_icon.svg';
import carbsImg from '../../assets/icons/carbs_icon.svg';
import fatImg from '../../assets/icons/fat_icon.svg';
import proteinImg from '../../assets/icons/protein_icon.svg';

import { UserContext } from '../../utils/context/userContext';
import useFetch from '../../utils/hooks/hook';

import Loader from '../Loader/Loader';

const KeyDatas = () => {
	const [user] = useContext(UserContext);

	const { data, isError, loading, errorMessage } = useFetch(`http://localhost:8080/user/`, user);
	const keyDatas = data.keyData;
	const todayScore = data.todayScore;

	console.log(keyDatas);

	return (
		<div>
			{isError ? (
				<div className="error">
					Une erreur est survenue lors du chargement des données clés : <br /> {isError && errorMessage}
				</div>
			) : loading ? (
				<Loader />
			) : (
				<div className="keyDatas">
					<div className="user__key__datas">
						<h2>
							<img src={caloryImg} alt="logo_calory" />
							{keyDatas.calorieCount}kCal
						</h2>
					</div>
					<div className="user__key__datas">
						<h2>
							<img src={proteinImg} alt="logo_protein" />
							{keyDatas.proteinCount}g
						</h2>
					</div>
					<div className="user__key__datas">
						<h2>
							<img src={carbsImg} alt="logo_carbs" />
							{keyDatas.carbohydrateCount}g
						</h2>
					</div>
					<div className="user__key__datas">
						<h2>
							<img src={fatImg} alt="logo_fat" />
							{keyDatas.lipidCount}g
						</h2>
					</div>
					<h3>Score = {todayScore}</h3>
				</div>
			)}
		</div>
	);
};

export default KeyDatas;

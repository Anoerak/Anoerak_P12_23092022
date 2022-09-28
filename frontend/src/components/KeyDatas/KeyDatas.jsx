import React, { useContext } from 'react';

import './KeyDatas.css';

import caloryImg from '../../assets/icons/calories_icon.svg';
import carbsImg from '../../assets/icons/carbs_icon.svg';
import fatImg from '../../assets/icons/fat_icon.svg';
import proteinImg from '../../assets/icons/protein_icon.svg';

import { UserContext } from '../../utils/context/userContext';
import useFetch from '../../utils/hooks/hook';

import Loader from '../Loader/Loader';

const KeyDatas = () => {
	const [user] = useContext(UserContext);

	const { data, isError, loading, errorMessage } = useFetch(user);
	const keyDatas = data.keyData;

	return (
		<div className="keyDatas__container">
			{isError ? (
				<div className="error">
					Une erreur est survenue lors du chargement des données clés : <br /> {isError && errorMessage}
				</div>
			) : loading ? (
				<Loader />
			) : (
				<div className="keyDatas">
					<div className="user__key__datas">
						<div>
							<img src={caloryImg} alt="logo_calory" />
						</div>
						<div className="key__data__text">
							<h2>{keyDatas.calorieCount}kCal</h2>
							<span>Calories</span>
						</div>
					</div>
					<div className="user__key__datas">
						<div>
							<img src={proteinImg} alt="logo_protein" />
						</div>
						<div className="key__data__text">
							<h2>{keyDatas.proteinCount}g</h2>
							<span>Protéines</span>
						</div>
					</div>
					<div className="user__key__datas">
						<div>
							<img src={carbsImg} alt="logo_carbs" />
						</div>
						<div className="key__data__text">
							<h2>{keyDatas.carbohydrateCount}g</h2>
							<span>Glucides</span>
						</div>
					</div>
					<div className="user__key__datas">
						<div>
							<img src={fatImg} alt="logo_fat" />
						</div>
						<div className="key__data__text">
							<h2>{keyDatas.lipidCount}g</h2>
							<span>Lipides</span>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default KeyDatas;

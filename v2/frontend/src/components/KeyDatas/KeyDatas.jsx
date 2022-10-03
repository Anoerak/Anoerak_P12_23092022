import React from 'react';
import PropTypes from 'prop-types';

import './KeyDatas.css';

import caloryImg from '../../assets/icons/calories_icon.svg';
import carbsImg from '../../assets/icons/carbs_icon.svg';
import fatImg from '../../assets/icons/fat_icon.svg';
import proteinImg from '../../assets/icons/protein_icon.svg';

import Loader from '../Loader/Loader';

/**
 * Display the KeyDatas component
 * @see module:KeyDatas
 * @param {Object} props
 * @returns {React.Component} KeyDatas component
 */
const KeyDatas = (props) => {
	return (
		<div className="keyDatas__container">
			{props.isError ? (
				<div className="error">
					Une erreur est survenue lors du chargement des données clés : <br />{' '}
					{props.isError && props.errorMessage}
				</div>
			) : props.loading ? (
				<Loader />
			) : (
				<div className="keyDatas">
					<div className="user__key__datas">
						<div>
							<img src={caloryImg} alt="logo_calory" />
						</div>
						<div className="key__data__text">
							<h2>{props.datas.calorieCount}kCal</h2>
							<span>Calories</span>
						</div>
					</div>
					<div className="user__key__datas">
						<div>
							<img src={proteinImg} alt="logo_protein" />
						</div>
						<div className="key__data__text">
							<h2>{props.datas.proteinCount}g</h2>
							<span>Protéines</span>
						</div>
					</div>
					<div className="user__key__datas">
						<div>
							<img src={carbsImg} alt="logo_carbs" />
						</div>
						<div className="key__data__text">
							<h2>{props.datas.carbohydrateCount}g</h2>
							<span>Glucides</span>
						</div>
					</div>
					<div className="user__key__datas">
						<div>
							<img src={fatImg} alt="logo_fat" />
						</div>
						<div className="key__data__text">
							<h2>{props.datas.lipidCount}g</h2>
							<span>Lipides</span>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

/**
 * PropTypes of the Keydatas Component
 * @module KeyDatas
 * @type {object}
 * @property {Object[]} datas - The datas for the graph
 * @property {boolean} loading - The loading state of the graph datas
 * @property {boolean} error - The error state of the API call
 * @property {string} errorMessage - The error text of the API call

 */
KeyDatas.propTypes = {
	datas: PropTypes.object,
	loading: PropTypes.bool,
	isError: PropTypes.bool,
	errorMessage: PropTypes.string,
};

export default KeyDatas;

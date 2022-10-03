import React from 'react';
import { RadialBarChart, RadialBar, PolarAngleAxis, Legend, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';

import Loader from '../../Loader/Loader';

import './ScoreGraph.css';

/**
 * Display the score graph
 * @see module:TodayScoreGraphProps
 * @see {@link https://recharts.org/en-US/api/RadialBarChart}
 * @param {Object} props - The props of the component
 * @returns {React.Component}  React component
 */
const ScoreGraph = (props) => {
	const customizedLegend = () => {
		return (
			<div className="score__graph__legend">
				<span className="today__score">{props.score * 100}%</span>
				<p>de votre objectif</p>
			</div>
		);
	};

	if (props.loading === true) {
		return <Loader />;
	} else {
		return (
			<div className="score__graph">
				<h3>Score</h3>
				<ResponsiveContainer width={'100%'} aspect={3.9225 / 4.0}>
					<RadialBarChart
						cx="50%"
						cy="50%"
						innerRadius="75%"
						outerRadius="85%"
						startAngle={90}
						endAngle={450}
						data={props.datas}
						style={{ backgroundColor: '#FFFFFF', clipPath: 'circle(37.5% at 50% 50%)' }}
					>
						<PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} fill="#FFFFFF" />
						<RadialBar
							minAngle={100}
							background={{ fill: '#FBFBFB' }}
							cornerRadius={5}
							clockWise
							dataKey="score"
							angleAxisId={0}
							style={{ zIndex: 5 }}
						/>
						<Legend content={customizedLegend} layout="vertical" verticalAlign="middle" />
					</RadialBarChart>
				</ResponsiveContainer>
			</div>
		);
	}
};

/**
 *
 * PropTypes of the Score component
 * @module TodayScoreGraphProps
 * @type {Object}
 * @property {Object[]} datas - The datas for the graph
 * @property {boolean} loading - The loading state of the graph datas
 * @property {boolean} error - The error state of the API call
 * @property {string} errorMessage - The error text of the API call
 *
 */
ScoreGraph.propTypes = {
	processedData: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string,
			score: PropTypes.number,
			fill: PropTypes.string,
		})
	),
};

export default ScoreGraph;

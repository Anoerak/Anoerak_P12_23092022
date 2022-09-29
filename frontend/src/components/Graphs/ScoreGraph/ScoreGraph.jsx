import React, { useContext } from 'react';
import { RadialBarChart, RadialBar, PolarAngleAxis, Legend, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';

import useFetch from '../../../utils/hooks/hook';
import { UserContext } from '../../../utils/context/userContext';

import { TodayScoreModel } from '../../../models/TodayScoreModel';

import Loader from '../../Loader/Loader';

import './ScoreGraph.css';

const ScoreGraph = () => {
	const [userId] = useContext(UserContext);
	const { data, loading } = useFetch(userId);

	const customizedLegend = () => {
		return (
			<div className="score__graph__legend">
				<span className="today__score">{data.todayScore * 100}%</span>
				<p>de votre objectif</p>
			</div>
		);
	};

	if (loading === true) {
		return <Loader />;
	} else {
		const todayScore = new TodayScoreModel(data);
		const processedData = todayScore.getTodayScore();
		// console.log(processedData);
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
						data={processedData}
						style={{ backgroundColor: '#FFFFFF', clipPath: 'circle(37.5% at 50% 50%)' }}
					>
						<PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} fill="#FFFFFF" />
						<RadialBar
							minAngle={100}
							background={{ fill: '#FFFFFF' }}
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

import React, { useContext } from 'react';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';

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
			<div className="scoreGraph__legend">
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
			<div className="scoreGraph">
				<h3>Score</h3>
				<ResponsiveContainer width={'100%'} aspect={3.9225 / 4.0}>
					<RadialBarChart
						cx="50%"
						cy="50%"
						innerRadius="70%"
						outerRadius="100%"
						barSize={(90, 10)}
						startAngle={90}
						endAngle={450}
						data={processedData}
					>
						<RadialBar minAngle={100} background={false} clockWise dataKey="score" />
						<Legend content={customizedLegend} layout="vertical" verticalAlign="middle" />
					</RadialBarChart>
				</ResponsiveContainer>
			</div>
		);
	}
};

export default ScoreGraph;

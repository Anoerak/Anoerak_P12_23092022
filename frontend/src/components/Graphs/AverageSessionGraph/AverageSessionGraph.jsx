import React, { useContext } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

import useFetch from '../../../utils/hooks/hook';
import { UserContext } from '../../../utils/context/userContext';

import { AverageSessionModel } from '../../../models/AverageSessionModel';

import Loader from '../../Loader/Loader';

import './AverageSessionGraph.css';

const AverageSessionGraph = () => {
	const [userId] = useContext(UserContext);
	const { data, loading } = useFetch(userId, 'average-sessions');

	if (loading === true) {
		return <Loader />;
	} else {
		const averageSessions = new AverageSessionModel(data);
		const processedData = averageSessions.getProcessedDatas();

		const CustomTooltip = ({ active, payload }) => {
			if (active && payload && payload.length) {
				return (
					<div className="customTooltip">
						<div className="tooltipDetails">
							<p className="label">{payload[0].payload.sessionLength} min</p>
						</div>
					</div>
				);
			}

			return null;
		};

		return (
			<div className="averageSessionGraph">
				<h3>Durée moyenne des sessions</h3>
				<ResponsiveContainer width={'100%'} aspect={3.9225 / 4.0}>
					<LineChart
						data={processedData}
						margin={{
							top: 50,
							right: -10,
							left: -10,
							bottom: 10,
						}}
					>
						<Line type="natural" dataKey="sessionLength" stroke="#FFFFFF" dot={false} />
						<XAxis dataKey="name" style={{ fill: 'rgba(255, 255, 255, 0.5' }} interval={0} />
						<YAxis hide={true} domain={[-15, 'dataMax + 15']} />
						<Tooltip content={<CustomTooltip payload={processedData} />} />
					</LineChart>
				</ResponsiveContainer>
			</div>
		);
	}
};

export default AverageSessionGraph;

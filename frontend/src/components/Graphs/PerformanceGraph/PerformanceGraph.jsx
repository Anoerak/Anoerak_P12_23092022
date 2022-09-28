import React, { useContext } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

import useFetch from '../../../utils/hooks/hook';
import { UserContext } from '../../../utils/context/userContext';

import { PerformanceModel } from '../../../models/PerformanceModel';

import Loader from '../../Loader/Loader';

import './PerformanceGraph.css';

const PerformanceGraph = () => {
	const [userId] = useContext(UserContext);
	const { data, loading } = useFetch(userId, 'performance');

	if (loading === true) {
		return <Loader />;
	} else {
		const performancesSessions = new PerformanceModel(data);
		const processedData = performancesSessions.getProcessedDatas();
		// console.log(processedData);

		return (
			<div className="performanceGraph">
				<ResponsiveContainer width={'100%'} aspect={3.9225 / 4.0}>
					<RadarChart
						cx="50%"
						cy="50%"
						margin={{
							top: 0,
							right: 20,
							bottom: 0,
							left: 20,
						}}
						data={processedData}
					>
						<PolarGrid stroke="#FFFFFF" />
						<PolarAngleAxis dataKey="subject" stroke="#FFFFFF" dy={2.5} tickLine={false} />
						<Radar dataKey="A" fill="#FF0101" fillOpacity={0.75} />
					</RadarChart>
				</ResponsiveContainer>
			</div>
		);
	}
};

export default PerformanceGraph;

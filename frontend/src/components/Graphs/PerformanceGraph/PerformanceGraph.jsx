import React, { useContext } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';

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
			<div className="performance__graph">
				<ResponsiveContainer width={'100%'} aspect={3.9225 / 4.0}>
					<RadarChart
						cx="50%"
						cy="50%"
						margin={{
							top: 0,
							right: 32.5,
							bottom: 0,
							left: 32.5,
						}}
						innerRadius={10}
						data={processedData}
					>
						<PolarGrid stroke="#FFFFFF" />
						<PolarAngleAxis dataKey="subject" stroke="#FFFFFF" dy={2.5} tickLine={false} fontSize={12} />
						<Radar dataKey="A" fill="#FF0101" fillOpacity={0.75} />
					</RadarChart>
				</ResponsiveContainer>
			</div>
		);
	}
};

PerformanceGraph.propTypes = {
	processedData: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string,
			sessionLength: PropTypes.number,
		})
	),
};

export default PerformanceGraph;

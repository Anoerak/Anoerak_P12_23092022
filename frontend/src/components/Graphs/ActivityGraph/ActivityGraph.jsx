import React, { useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import useFetch from '../../../utils/hooks/hook';
import { UserContext } from '../../../utils/context/userContext';

import { ActivityModel } from '../../../models/ActivityModel';

import Loader from '../../Loader/Loader';

import './ActivityGraph.css';

const ActivityGraph = () => {
	const [userId] = useContext(UserContext);
	const { data, loading } = useFetch(userId, 'activity');

	if (loading === true) {
		return <Loader />;
	} else {
		const activityDatas = new ActivityModel(data);
		const processedData = activityDatas.getSessions();
		// console.log(processedData);

		return (
			<div className="activityGraph">
				<h3>Activité quotidienne</h3>
				<ResponsiveContainer minWidth={'100%'} minHeight={320}>
					<BarChart
						barGap={8}
						data={processedData}
						margin={{
							top: 5,
							right: 30,
							left: 43,
							bottom: 5,
						}}
					>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey={processedData.name} scale="point" padding={{ left: 10, right: 10 }} />
						<YAxis dataKey={processedData.weight} hide={false} />
						<Tooltip />
						<Legend iconType="circle" />
						<Bar
							name="Poids (kg)"
							dataKey="weight"
							fill="#282D30"
							barSize={7}
							maxBarSize={71}
							radius={[3, 3, 0, 0]}
						/>
						<Bar
							name="Calories brûlées (kcal)"
							dataKey="calories"
							fill="#E60000"
							barSize={7}
							maxBarSize={71}
							radius={[3, 3, 0, 0]}
						/>
					</BarChart>
				</ResponsiveContainer>
			</div>
		);
	}
};

export default ActivityGraph;

import React, { useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';

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

		const customTooltipFunction = ({ active, payload }) => {
			if (active && payload && payload.length) {
				return (
					<div className="custom__tooltip">
						<div className="tooltip__details">
							<p className="label">{payload[0].payload.weight}kg</p>
							<p className="label">{payload[0].payload.calories}Kcal</p>
						</div>
					</div>
				);
			}

			return null;
		};

		return (
			<div className="activity__graph">
				<h3>Activité quotidienne</h3>
				<ResponsiveContainer minWidth={'100%'} aspect={22.75 / 9}>
					<BarChart
						barGap={8}
						data={processedData}
						margin={{
							top: 100,
							right: 30,
							left: 43,
							bottom: 20,
						}}
					>
						<CartesianGrid strokeDasharray="3 3" vertical={false} />
						<XAxis dataKey="name" padding={{ left: -35, right: -35 }} tickMargin={16} />
						<YAxis
							dataKey="weight"
							orientation="right"
							tickLine={false}
							axisLine={false}
							tickMargin={45}
							minTickGap={27}
							tick={{ strokeWidth: 14, fill: 'var(--octonary-color)' }}
							interval={'preserveStartEnd'}
							allowDecimals={false}
							domain={['dataMin-1', 'dataMax+1']}
							yAxisId={0}
						/>
						<YAxis dataKey="calories" hide={true} yAxisId={1} />
						<Tooltip
							content={customTooltipFunction}
							offset={60}
							allowEscapeViewBox={{ x: true, y: true }}
							position={{ y: 80 }}
						/>
						<Legend
							verticalAlign="top"
							align="right"
							wrapperStyle={{ top: 35, right: 25 }}
							payload={[
								{
									value: 'Poids (kg)',
									type: 'circle',
									id: 'weightActivity',
								},
								{
									value: 'Calories brûlées (kcal)',
									type: 'circle',
									id: 'caloriesActivity',
								},
							]}
						/>
						<Bar yAxisId={0} dataKey="weight" fill="#282D30" barSize={7} radius={[3, 3, 0, 0]} unit="kg" />
						<Bar
							yAxisId={1}
							dataKey="calories"
							fill="#E60000"
							barSize={7}
							radius={[3, 3, 0, 0]}
							unit="kcal"
						/>
					</BarChart>
				</ResponsiveContainer>
			</div>
		);
	}
};

ActivityGraph.propTypes = {
	processedData: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			weight: PropTypes.number.isRequired,
			calories: PropTypes.number.isRequired,
		})
	),
};

export default ActivityGraph;

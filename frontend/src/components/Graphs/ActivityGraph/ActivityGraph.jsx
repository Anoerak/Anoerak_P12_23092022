import React, { useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';

import useFetch from '../../../utils/hooks/hook';
import { UserContext } from '../../../utils/context/userContext';

import { ActivityModel } from '../../../models/ActivityModel';

import Loader from '../../Loader/Loader';

import './ActivityGraph.css';

/**
 * Display the activity graph
 * @returns {React.Component}  React component
 */
const ActivityGraph = () => {
	// Get the user id from the context
	const [userId] = useContext(UserContext);
	// Get the datas from the API
	const { data, loading } = useFetch(userId, 'activity');

	if (loading === true) {
		return <Loader />;
	} else {
		/**
		 * Format the datas to display in the graph
		 * @param {Array} datas  Datas to format
		 * @returns {Array}  Formatted datas
		 */
		const activityDatas = new ActivityModel(data);
		const processedData = activityDatas.getSessions();
		// console.log(processedData);

		/**
		 * Customize the tooltip if the user hovers a bar in the graph
		 * @param {Object} active Active bar
		 * @param {Object} payload  Props of the tooltip
		 * @returns {React.Component}  React component
		 */
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

		/**
		 * Display the BarChart component from Recharts
		 * @returns {React.Component}  React component
		 */
		return (
			<div className="activity__graph">
				<h3>Activité quotidienne</h3>
				{/* Using a ratio for the ResponsiveContainer */}
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
						{/* Removing the vertical line from the graph */}
						<CartesianGrid strokeDasharray="3 3" vertical={false} />
						{/* Moving the first bars and the last bars to the left and to the right */}
						<XAxis dataKey="name" padding={{ left: -35, right: -35 }} tickMargin={16} />
						{/* Setting the YAxis for the weight datas */}
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
						{/* Setting up the YAxis for the calories datas and hidding the line */}
						<YAxis dataKey="calories" hide={true} yAxisId={1} />
						{/* Setting up and customizing the tooltip */}
						<Tooltip
							content={customTooltipFunction}
							offset={60}
							allowEscapeViewBox={{ x: true, y: true }}
							position={{ y: 80 }}
						/>
						{/* Customization of the ToolTip */}
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
						{/* Customization of the bars (size, color, etc.) */}
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

/**
 * Define the props types of the component
 * @type {Object}
 * @property {arrayOf} processedData  Datas to display in the graph
 * @property {string} name Name of the bar
 * @property {number} weight Weight of the bar
 * @property {number} calories Calories of the bar
 */
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

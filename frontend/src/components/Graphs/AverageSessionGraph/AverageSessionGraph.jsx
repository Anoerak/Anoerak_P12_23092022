import React, { useContext } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Rectangle } from 'recharts';
// import PropTypes from 'prop-types';

import useFetch from '../../../utils/hooks/hook';
import { UserContext } from '../../../utils/context/userContext';

import { AverageSessionModel } from '../../../models/AverageSessionModel';

import Loader from '../../Loader/Loader';

import './AverageSessionGraph.css';

/**
 * Display the average session graph
 * @see module:useFetch
 * @see module:AverageSessionModel
 * @see {@link https://recharts.org/en-US/api/LineChart}
 * @returns {React.Component} Average session graph
 */

const AverageSessionGraph = () => {
	const [userId] = useContext(UserContext);
	const { data, loading } = useFetch(userId, 'average-sessions');

	if (loading === true) {
		return <Loader />;
	} else {
		/**
		 * Format the datas to get an array of objects with the following structure:
		 * { name: 'weekday', sessionLength: 'sessionLength'}
		 * @module AverageSessionModel
		 * @param {Array} datas  Datas to format
		 * @returns {Array} Formatted datas
		 */
		const averageSessions = new AverageSessionModel(data);
		const processedData = averageSessions.getProcessedDatas();

		const CustomTooltip = ({ active, payload }) => {
			if (active && payload && payload.length) {
				return (
					<div className="custom__tooltip__average">
						<div className="tooltip__details__average">
							<p className="label__average">{payload[0].payload.sessionLength} min</p>
						</div>
					</div>
				);
			}

			return null;
		};

		// Customize the area after the cursor when hovering the graph
		const CustomCursorArea = ({ points }) => {
			return <Rectangle fill="#000000" opacity={0.1} x={points[0].x} width={300} height={300} />;
		};

		return (
			<div className="average__session__graph">
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
						{/* Type of line, remove the dots, change the color and the width of the line */}
						<Line type="natural" dataKey="sessionLength" stroke="#FFFFFF" dot={false} />
						<XAxis dataKey="name" style={{ fill: 'rgba(255, 255, 255, 0.5' }} interval={0} />
						{/* Hide the axis */}
						<YAxis hide={true} domain={['dataMin-10', 'dataMax + 5']} />
						{/* Use the CustomToolTip & CustomCursorArea and move the Tooptip 60px off from the cursor */}
						<Tooltip
							content={<CustomTooltip payload={processedData} />}
							cursor={<CustomCursorArea />}
							// position={{ y: 50 }}
							offset={-60}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		);
	}
};

// AverageSessionGraph.propTypes = {
// 	processedData: PropTypes.arrayOf(
// 		PropTypes.shape({
// 			name: PropTypes.string,
// 			sessionLength: PropTypes.number,
// 		})
// 	),
// };

export default AverageSessionGraph;

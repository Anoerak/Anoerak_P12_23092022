import React, { useContext } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Rectangle } from 'recharts';
import PropTypes from 'prop-types';

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

		/**
		 * React component to render custom tooltip
		 * @param {Object} props - props of the component
		 * @returns {React.Component}  React component
		 */
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
						<Line type="natural" dataKey="sessionLength" stroke="#FFFFFF" dot={false} />
						<XAxis dataKey="name" style={{ fill: 'rgba(255, 255, 255, 0.5' }} interval={0} />
						<YAxis hide={true} domain={['dataMin-10', 'dataMax + 5']} />
						<Tooltip
							content={<CustomTooltip payload={processedData} />}
							cursor={<CustomCursorArea />}
							position={{ y: 50 }}
							offset={20}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		);
	}
};

AverageSessionGraph.propTypes = {
	processedData: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string,
			sessionLength: PropTypes.number,
		})
	),
};

export default AverageSessionGraph;

import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';

import Loader from '../../Loader/Loader';

import './PerformanceGraph.css';

/**
 * Display the performance graph
 * @see module:PerformanceGraphProps
 * @see {@link https://recharts.org/en-US/api/RadarChart}
 * @param {Object} props - The props of the component
 * @returns {React.Component}  React component
 */
const PerformanceGraph = (props) => {
	if (props.loading === true) {
		return <Loader />;
	} else {
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
						data={props.datas}
					>
						<PolarGrid stroke="#FFFFFF" />
						<PolarAngleAxis dataKey="type" stroke="#FFFFFF" dy={2.5} tickLine={false} fontSize={12} />
						<Radar dataKey="value" fill="#FF0101" fillOpacity={0.75} />
					</RadarChart>
				</ResponsiveContainer>
			</div>
		);
	}
};

/**
 *
 * PropTypes of the Performance component
 * @module PerformanceGraphProps
 * @type {Object}
 * @property {Object[]} datas - The datas for the graph
 * @property {boolean} loading - The loading state of the graph datas
 * @property {boolean} error - The error state of the API call
 * @property {string} errorMessage - The error text of the API call
 *
 */
PerformanceGraph.propTypes = {
	datas: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string,
			sessionLength: PropTypes.number,
		})
	),
};

export default PerformanceGraph;

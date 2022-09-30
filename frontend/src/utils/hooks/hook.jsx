import { useState, useEffect } from 'react';

/**
 * Personalized hook to fetch data from the API
 *
 * @param {number} id user id
 * @param {string} path specific path to fetch data {optional}
 * @returns {Array} data, isError, loading, errorMessage
 */
const useFetch = (id, path) => {
	// get the state to define if we call the API or not
	const mockedStatus = localStorage.getItem('mockedDatas');

	// Define the url to fetch when we are not in api mode
	const apiUrl = path === undefined ? `http://localhost:8080/user/${id}` : `http://localhost:8080/user/${id}/${path}`;

	// Define the url to fetch when we are in mocked mode
	const mockedUrl = path === undefined ? `../../data/${id}/datas.json` : `../../data/${id}/${path}/datas.json`;

	// Define the url to fetch based on the mocked status
	const url = mockedStatus === 'true' ? mockedUrl : apiUrl;

	const [data, setData] = useState({});
	const [loading, setLoading] = useState(true);
	const [{ isError, errorMessage }, setError] = useState({ isError: false, errorMessage: '' });

	useEffect(() => {
		if (!url) return;

		setLoading(true);

		const fetchData = async () => {
			try {
				const response = await fetch(url, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
					},
				});
				const data = await response.json();
				setData(data.data);
			} catch (error) {
				setError({ isError: true, errorMessage: error.message });
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [url]);

	return { data, loading, isError, errorMessage };
};

export default useFetch;

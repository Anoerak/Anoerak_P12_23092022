import { useState, useEffect } from 'react';

const useFetch = (url, id, path) => {
	const [data, setData] = useState({});
	const [loading, setLoading] = useState(true);
	const [{ isError, errorMessage }, setError] = useState({ isError: false, errorMessage: '' });

	useEffect(() => {
		if (!url || !id) return;

		setLoading(true);

		if (!path) {
			const fetchData = async () => {
				try {
					const response = await fetch(url + id, {
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
		} else {
			const fetchData = async () => {
				try {
					const response = await fetch(url + id + path, {
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
		}
	}, [url, id, path]);

	return { data, loading, isError, errorMessage };
};

export default useFetch;

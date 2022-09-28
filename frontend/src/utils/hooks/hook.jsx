import { useState, useEffect } from 'react';

const useFetch = (id, path) => {
	const mockedStatus = localStorage.getItem('mockedDatas');

	const apiUrl = path === undefined ? `http://localhost:8080/user/${id}` : `http://localhost:8080/user/${id}/${path}`;
	const mockedUrl = path === undefined ? `../../data/${id}/datas.json` : `../../data/${id}/${path}/datas.json`;
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

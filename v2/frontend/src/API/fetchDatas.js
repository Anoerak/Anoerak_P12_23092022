import { API } from './api.js';

/**
 *
 * Class FetchDatas is a class that contains all the API calls used in 'Dashboard.jsx' for the props.
 * @class FetchDatas
 * @classdesc Fetch the datas from the API.
 * @extends API
 * @returns {object} The data fetched from the API.
 *
 */
export class FetchDatas {
	/**
	 * Return the user datas from '.../user/:id'.
	 * @param {number} id The user id.
	 * @returns {object} The data fetched from the API.
	 */
	async getUserDatas(id) {
		const myAPI = new API(id);
		const userDatas = myAPI.getDatas();
		const userDatasPromise = userDatas.then((data) => {
			return data;
		});
		return userDatasPromise;
	}

	/**
	 *
	 * Return the user activity datas from '.../user/:id/activity'.
	 * @param {number} id The user id.
	 * @param {string} path The path of the API.
	 * @returns {object} The activity data fetched from the API.
	 * @returns {boolean} The loading status of the API.
	 * @returns {boolean} The error status of the API.
	 * @returns {string} The error message of the API.
	 */
	async getActivityDatas(id, path) {
		const myAPI = new API(id, path);
		const activityDatas = myAPI.getDatas();
		const activityDatasPromise = activityDatas.then((data) => {
			return data;
		});
		return activityDatasPromise;
	}

	/**
	 * Return the user average-sessions datas from '.../user/:id/average-sessions'.
	 * @param {number} id The user id.
	 * @param {string} path The path of the API.
	 * @returns {object} The average session data fetched from the API.
	 * @returns {boolean} The loading status of the API.
	 * @returns {boolean} The error status of the API.
	 * @returns {string} The error message of the API.
	 *
	 */
	async getAverageSessionDatas(id, path) {
		const myAPI = new API(id, path);
		const averageSessionDatas = myAPI.getDatas();
		const averageSessionDatasPromise = averageSessionDatas.then((data) => {
			return data;
		});
		return averageSessionDatasPromise;
	}

	/**
	 * Return the user performance datas from '.../user/:id/performance'.
	 * @param {*} id The user id.
	 * @param {*} path The path of the API.
	 * @returns	{object} The performance data fetched from the API.
	 * @returns {boolean} The loading status of the API.
	 * @returns {boolean} The error status of the API.
	 * @returns {string} The error message of the API.
	 */
	async getPerformanceDatas(id, path) {
		const myAPI = new API(id, path);
		const performanceDatas = myAPI.getDatas();
		const performanceDatasPromise = performanceDatas.then((data) => {
			return data;
		});
		return performanceDatasPromise;
	}

	/**
	 * Return the user performance datas from '.../user/:id/performance'.
	 * @param {*} id The user id.
	 * @param {*} path The path of the API.
	 * @returns	{object} The performance data fetched from the API.
	 * @returns {boolean} The loading status of the API.
	 * @returns {boolean} The error status of the API.
	 * @returns {string} The error message of the API.
	 *
	 */
	async getTodayScoreDatas(id) {
		const myAPI = new API(id);
		const todayScoreDatas = myAPI.getTodayScoreDatas();
		const todayScoreDatasPromise = todayScoreDatas.then((data) => {
			return data;
		});
		return todayScoreDatasPromise;
	}
}

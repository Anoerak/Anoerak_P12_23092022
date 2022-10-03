import { ActivityModel } from '../models/ActivityModel';
import { AverageSessionModel } from '../models/AverageSessionModel';
import { PerformanceModel } from '../models/PerformanceModel';
import { TodayScoreModel } from '../models/TodayScoreModel';

/**
 *
 * Class API is a class that contains all the API calls and their respective
 * models.
 * @class API
 * @param {number} id - The id of the user.
 * @param {string} path - The type of data to be fetched.
 *  (e.g. 'activity', 'performance', 'average-session', 'today-score')
 * @returns {object} - The data fetched from the API.
 *
 */

export class API {
	constructor(id, path) {
		/* The type of activity to be fetched. */
		this.path = path;
		/* The Boolean value that indicate the type of data to be fetched (API or Mocked). */
		this.mockedStatus = localStorage.getItem('mockedDatas');
		/* the url based on the mocked status and the parameters (with or without path). */
		this.apiUrl =
			path === undefined ? `http://localhost:8080/user/${id}` : `http://localhost:8080/user/${id}/${path}`;
		this.mockedUrl = path === undefined ? `../../data/${id}/datas.json` : `../../data/${id}/${path}/datas.json`;
		this.url = this.mockedStatus === 'true' ? this.mockedUrl : this.apiUrl;
		/* The returned values from the API. */
		this.datas = [];
		this.loading = false;
		this.error = false;
		this.errorMessage = '';
	}

	/**
	 *
	 * Return the user datas from route '.../user/:id'.
	 * @returns {array} The data fetched from the API.
	 * @returns {boolean} The loading status of the API.
	 * @returns {boolean} The error status of the API.
	 * @returns {string} The error message of the API.
	 *
	 */
	async getUserDatas() {
		const fetchData = async () => {
			try {
				const response = await fetch(this.url);
				const data = await response.json();
				// console.log(data.data);
				this.loading = false;
				this.error = false;
				this.errorMessage = '';
				this.datas.push(data.data, this.loading, this.error, this.errorMessage);
				return this.datas;
			} catch (error) {
				this.loading = false;
				this.error = true;
				this.errorMessage = error;
				this.datas.push(this.datas, this.loading, this.error, this.errorMessage);
			}
		};
		await fetchData();
		return this.datas;
	}

	/**
	 *
	 * Return the user activity datas from '.../user/:id/activity' based on 'ActivityModel'.
	 * @returns {object} The data fetched from the API.
	 * @returns {boolean} The loading status of the API.
	 * @returns {boolean} The error status of the API.
	 * @returns {string} The error message of the API.
	 *
	 */
	async getActivityDatas() {
		const data = await this.getUserDatas();
		const activityDatas = new ActivityModel(data);
		const processedDatas = activityDatas.getSessions();
		// console.log(processedDatas);
		return processedDatas;
	}

	/**
	 *
	 * Return the user average session datas from '.../user/:id/average-sessions' based on 'AverageSessionModel'.
	 * @returns {object} The data fetched from the API.
	 * @returns {boolean} The loading status of the API.
	 * @returns {boolean} The error status of the API.
	 * @returns {string} The error message of the API.
	 *
	 */
	async getAverageSessionDatas() {
		const data = await this.getUserDatas();
		const averageSessions = new AverageSessionModel(data);
		const processedDatas = averageSessions.getProcessedDatas();
		// console.log(processedDatas);
		return processedDatas;
	}

	/**
	 *
	 * Return the user performance datas from '.../user/:id/performance' based on 'PerformanceModel'.
	 * @returns {object} The data fetched from the API.
	 * @returns {boolean} The loading status of the API.
	 * @returns {boolean} The error status of the API.
	 * @returns {string} The error message of the API.
	 *
	 */
	async getPerformanceDatas() {
		const data = await this.getUserDatas();
		const performanceDatas = new PerformanceModel(data);
		const processedDatas = performanceDatas.getProcessedDatas();
		// console.log(processedDatas);
		return processedDatas;
	}

	/**
	 *
	 * Return the user today score datas from '.../user/:id/today-score' based on 'TodayScoreModel'.
	 * @returns {object} The data fetched from the API.
	 * @returns {boolean} The loading status of the API.
	 * @returns {boolean} The error status of the API.
	 * @returns {string} The error message of the API.
	 *
	 */
	async getTodayScoreDatas() {
		const data = await this.getUserDatas();
		const todayScoreDatas = new TodayScoreModel(data[0]);
		const processedDatas = todayScoreDatas.getTodayScore();
		// console.log(processedDatas);
		return processedDatas;
	}

	/**
	 * Global function which the user datas based on the 'path' value.
	 * @returns {object} The data fetched from the API.
	 * @returns {boolean} The loading status of the API.
	 * @returns {boolean} The error status of the API.
	 * @returns {string} The error message of the API.
	 */
	async getDatas() {
		switch (this.path) {
			case 'activity':
				return await this.getActivityDatas();
			case 'average-sessions':
				return await this.getAverageSessionDatas();
			case 'performance':
				return await this.getPerformanceDatas();
			case 'today-score':
				return await this.getTodayScoreDatas();
			default:
				return this.getUserDatas();
		}
	}
}

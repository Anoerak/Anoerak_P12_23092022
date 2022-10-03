export class AverageSessionModel {
	constructor(data) {
		// console.log(data[0].sessions);
		this.id = data[0].userId;
		this.sessions = data[0].sessions;
	}

	getProcessedDatas() {
		let userSessions = this.sessions;
		let weekDays = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
		let datas = [
			{
				name: 'L',
				sessionLength: userSessions[0].sessionLength,
			},
		];
		userSessions.forEach((session) => {
			datas.push({
				name: weekDays[session.day - 1],
				sessionLength: session.sessionLength,
			});
		});
		datas.push({
			name: 'D',
			sessionLength: userSessions[userSessions.length - 1].sessionLength,
		});
		return datas;
	}
}

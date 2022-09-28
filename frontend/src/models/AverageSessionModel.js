export class AverageSessionModel {
	constructor(data) {
		this.id = data.userId;
		this.sessions = data.sessions;
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

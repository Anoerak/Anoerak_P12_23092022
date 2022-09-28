export class ActivityModel {
	constructor(data) {
		this.id = data.userId;
		this.sessions = data.sessions;
	}

	getSessions() {
		let datas = [];
		this.sessions.forEach((element) => {
			let date = new Date(element.day);
			datas.push({
				name: date.getDate(),
				weight: element.kilogram,
				calories: element.calories,
			});
		});
		return datas;
	}
}

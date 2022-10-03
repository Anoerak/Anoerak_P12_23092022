export class ActivityModel {
	constructor(data) {
		// console.log(data[0].sessions);
		// this.id = data[0].userId;
		this.sessions = data[0].sessions;
		// console.log(this.sessions);
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

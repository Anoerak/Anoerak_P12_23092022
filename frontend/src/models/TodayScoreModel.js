export class TodayScoreModel {
	constructor(data) {
		this.id = data.userId;
		this.score = data.todayScore;
	}

	getTodayScore() {
		let data = [
			{
				name: 'Score',
				score: this.score * 100,
				fill: '#FF0000',
			},
		];
		return data;
	}
}

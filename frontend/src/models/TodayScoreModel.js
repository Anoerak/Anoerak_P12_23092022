export class TodayScoreModel {
	constructor(data) {
		this.id = data.userId;
		this.score = data.todayScore;
	}

	getTodayScore() {
		let maxScore = {
			score: 100,
			name: 'max',
			fill: '#FFFFFF',
		};
		let data = [
			{
				name: 'Score',
				score: this.score * 100,
				fill: '#FF0000',
			},
			maxScore,
		];
		return data;
	}
}

export class PerformanceModel {
	constructor(data) {
		this.id = data[0].data.userId;
		this.kind = data[0].kind;
		this.kindValues = data[0].data;
	}

	getTranslateKindString(string) {
		switch (string) {
			case 'cardio':
				return 'Cardio';
			case 'energy':
				return 'Energie';
			case 'endurance':
				return 'Endurance';
			case 'strength':
				return 'Force';
			case 'speed':
				return 'Vitesse';
			case 'intensity':
				return 'Intensité';
			default:
				return 'Aucun';
		}
	}

	getArrayRearrange(array) {
		array.reverse();
		return array;
	}

	getProcessedDatas() {
		let kindValues = this.kindValues;
		let datas = [];
		let values = [];
		kindValues.forEach((value) => {
			values.push(value.value);
		});

		kindValues.forEach((kindValue) => {
			datas.push({
				type: this.getTranslateKindString(Object.values(this.kind)[kindValue.kind - 1]),
				value: kindValue.value,
				maxValue: Math.max(...values),
			});
		});
		return datas.reverse();
	}
}

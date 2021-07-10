export interface IDividend {
	dividends: number;
	timestamp: Date;
}

export type TTendencyDirection = '>' | '<' | '=';

export interface ITendencyStrategy {
	getTendency (dividend: IDividend, tendency: ITendency): TTendencyDirection;
}

export interface ITendency {
	start: Date;
	end: Date | null;
	lastValue: number;
	tendency: TTendencyDirection;
}

export class TendencyMapper {
	constructor (
		private readonly tendencyStrategy: ITendencyStrategy,
	) {}

	getTendencies (dividends: IDividend[]): ITendency[] {
		const result: ITendency[] = [
			{
				start: dividends[0].timestamp,
				end: null,
				lastValue: dividends[0].dividends,
				tendency: '=',
			},
		];

		// dividends.shift();

		for (let i = 1; i < dividends.length; i++) {
			const dividend = dividends[i];
			const lastTendency = result[result.length - 1];

			const tendency = this.tendencyStrategy.getTendency(dividend, lastTendency);

			if (lastTendency.tendency !== tendency) {
				lastTendency.end = dividends[i-1].timestamp;

				result.push({
					start: dividends[i-1].timestamp,
					end: null,
					lastValue: dividend.dividends,
					tendency: tendency,
				});
			} else {
				lastTendency.lastValue = dividend.dividends;
			}
		}

		// result.shift();

		return result;
	}
}
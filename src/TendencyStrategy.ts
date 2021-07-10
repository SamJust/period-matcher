import { IDividend, ITendency, ITendencyStrategy, TTendencyDirection } from "./TendencyMapper";

export class TendencyStrategy implements ITendencyStrategy {
	private dividendThreshold = 0.4;

	getTendency (dividend: IDividend, tendency: ITendency): TTendencyDirection {
		if (Math.abs(dividend.dividends - tendency.lastValue) < this.dividendThreshold) {
			return '=';
		}

		if (dividend.dividends < tendency.lastValue) {
			return '<';
		}

		if (dividend.dividends > tendency.lastValue) {
			return '>';
		}

		throw new Error('Invalid delta from dividends');
	}
}
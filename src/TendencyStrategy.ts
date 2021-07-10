import { IDividend, ITendency, ITendencyStrategy, TTendencyDirection } from "./TendencyMapper";

export class TendencyStrategy implements ITendencyStrategy {
	private dividendThreshold = 1;

	getTendency (dividend: IDividend, tendency: ITendency): TTendencyDirection {
		if (dividend.dividends < tendency.lastValue) {
			return '<';
		}

		if (dividend.dividends > tendency.lastValue) {
			return '>';
		}

		if (dividend.dividends === tendency.lastValue) {
			return '=';
		}

		throw new Error('Invalid delta from dividends');
	}
}
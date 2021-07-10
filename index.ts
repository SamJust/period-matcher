import fs from 'fs/promises';
import { IDividend, TendencyMapper } from './src/TendencyMapper';
import { TendencyStrategy } from './src/TendencyStrategy';

void async function main () {
	const dataPath: string | undefined = process.argv[2];

	if (!dataPath) {
		throw new Error('Please, pass a path to the data file');
	}

	const fileData = await fs.readFile(dataPath);

	const dividendsData: { Dividends: number, Date: string }[] = JSON.parse(fileData.toString());

	const data: IDividend[] = dividendsData.map((item) => {
		return {
			dividends: item.Dividends,
			timestamp: new Date(item.Date),
		};
	}).sort((a, b) => {
		return a.timestamp.valueOf() - b.timestamp.valueOf();
	});

	const mapper = new TendencyMapper(
		new TendencyStrategy()
	);

	const maps = mapper.getTendencies(data);

	console.log(maps);
} ()
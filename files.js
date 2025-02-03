const cellSplit = /(?<!\\),/;
const lineSplit = /(?<!\\)\r\n|(?<!\\)\n/;

/**
 * Parses read File object into an array of objects
 * @param {Blob} file
 * @returns {array<object>} data
 */
export function parseCSV(file) {
	const lines = file.split(lineSplit);
	if (lines.length < 2) {
		throw new Error('File must have at least 2 lines');
	}
	const headers = lines[0].split(cellSplit);
	const data = [];
	for (let i = 1; i < lines.length; i++) {
		const obj = {};
		const currentLine = lines[i].split(cellSplit);
		for (let j = 0; j < headers.length; j++) {
			obj[headers[j]] = currentLine[j];
		}
		data.push(obj);
	}
	return data;
}

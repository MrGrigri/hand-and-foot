export const capitalizeAllWords = (word: string): string =>
	word
		.trim()
		.split(' ')
		.map((word) => `${word.charAt(0).toLocaleUpperCase()}${word.slice(1)}`)
		.join(' ');

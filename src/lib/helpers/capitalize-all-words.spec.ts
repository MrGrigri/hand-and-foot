import { describe, expect, it } from 'vitest';
import { capitalizeAllWords } from './capitalize-all-words';

describe('capitalizeAllWords', () => {
	it('Should capitalize the words', () => {
		const fakeSentence = 'this is a test sentence ';

		const response = capitalizeAllWords(fakeSentence);

		expect(response).toBe('This Is A Test Sentence');
	});
});

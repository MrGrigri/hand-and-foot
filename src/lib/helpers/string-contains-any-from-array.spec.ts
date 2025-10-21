import { describe, expect, it } from 'vitest';
import { stringContainsAnyFromArray } from './string-contains-any-from-array';
import { faker } from '@faker-js/faker';

describe('stringContainsAnyFromArray', () => {
	it('Should return false', () => {
		const fakeString = faker.string.alphanumeric(5);
		const fakeArray = [faker.word.words(1), faker.word.words(1), faker.word.words(1)];

		const response = stringContainsAnyFromArray(fakeString, fakeArray);

		expect(response).toBe(false);
	});

	it('Should return true', () => {
		const fakeString = faker.word.words(5);
		const fakeArray = [fakeString, faker.word.words(1), faker.word.words(1)];

		const response = stringContainsAnyFromArray(fakeString, fakeArray);

		expect(response).toBe(true);
	});
});

import { describe, expect, it, vi } from 'vitest';
import { getRandomNumber } from './get-random-number';

describe('getRandomNumber', () => {
	it('Should return a random number', () => {
		const randomSpy = vi.spyOn(Math, 'random').mockReturnValue(0.5);
		const response = getRandomNumber();

		expect(response).toBe(5);
		expect(randomSpy).toHaveBeenCalledTimes(1);
	});
});

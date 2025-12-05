/**
 * This function will get a random whole number between the minimum (min) and maximum (max) values
 *
 * @example
 * import { getRandomNumber } from '$lib';
 *
 * console.log(getRandomNumber()) // Output: [0-10]
 *
 * @param {number} [min=0] - Minimum value, defaults to 0; will be rounded up using `Math.ceil()`
 * @param {number} [max=10] - Maximum value, defaults to 10; will be rounded down using `Math.floor()`
 */
export const getRandomNumber = (min: number = 0, max: number = 10): number =>
	Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);

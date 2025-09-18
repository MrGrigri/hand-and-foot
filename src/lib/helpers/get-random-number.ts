export const getRandomNumber = (min: number = 0, max: number): number =>
	Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);

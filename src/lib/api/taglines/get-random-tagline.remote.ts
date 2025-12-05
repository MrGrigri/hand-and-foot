import { query } from '$app/server';
import { getRandomNumber } from '$lib/helpers';
import { getAllTaglines } from './get-taglines.remote';

export const getRandomTagline = query(async () => {
	const taglines = await getAllTaglines();

	return taglines[getRandomNumber(0, taglines.length - 1)];
});

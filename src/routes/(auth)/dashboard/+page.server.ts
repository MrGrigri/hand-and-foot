import { getRandomNumber } from '$lib';
import { database } from '$lib/supabase/create-client';
import type { Games } from '$lib/types/database/games';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const { data: games, error: databaseError } = await database.from('games').select();

	if (databaseError) {
		console.error(databaseError);
	}

	const taglines = [
		`You must feel so lonely!`,
		`Why don't you have any friends?`,
		`Don't play with yourself! Play with others!!`,
		`There had better be a good reason for no games!`
	];
	const tagline = taglines[getRandomNumber(0, taglines.length - 1)];

	return { games: (games ?? []) as Games, tagline };
};

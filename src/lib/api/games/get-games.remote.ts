import { getRequestEvent, query } from '$app/server';
import type { Game } from '$lib/types/database/games';
import { error } from '@sveltejs/kit';

export const getGames = query(async () => {
	const {
		locals: { supabase }
	} = getRequestEvent();

	const { data: games, error: supabaseError } = await supabase.from('games').select<'*', Game>('*');

	if (supabaseError) {
		return error(500, {
			message: 'Something went wrong'
		});
	}

	return games;
});

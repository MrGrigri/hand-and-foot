import { getRequestEvent, query } from '$app/server';
import type { Game } from '$lib/types/database/games';
import { error } from '@sveltejs/kit';
import { retry } from '$lib/helpers';

export const getGames = query(async () => {
	const {
		locals: { supabase }
	} = getRequestEvent();

	try {
		return await retry(async () => {
			const { data: supabaseData, error: supabaseError } = await supabase
				.from('games')
				.select<'*', Game>('*');
			if (supabaseError) throw supabaseError;
			return supabaseData;
		});
	} catch {
		return error(500, {
			message: 'Something went wrong'
		});
	}
});

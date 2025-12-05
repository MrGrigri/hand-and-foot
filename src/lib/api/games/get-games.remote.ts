import { getRequestEvent, query } from '$app/server';
import type { Game } from '$lib/types/database/games';
import { error } from '@sveltejs/kit';
import { retry } from '$lib/helpers';

export const getGames = query(async () => {
	const {
		locals: { supabase }
	} = getRequestEvent();

	try {
		const res = await retry(async () => {
			const r = await supabase.from('games').select<'*', Game>('*');
			if (r.error) throw r.error;
			return r;
		});

		return res.data;
	} catch {
		return error(500, {
			message: 'Something went wrong'
		});
	}
});

import { form, getRequestEvent } from '$app/server';
import { addGameSchema } from '$lib/schemas/add-game-schema';
import { error, redirect } from '@sveltejs/kit';
import { getGames } from './get-games.remote';

export const addGame = form(addGameSchema, async ({ title, players }) => {
	const {
		locals: { supabase }
	} = getRequestEvent();

	const { data, error: supabaseError } = await supabase
		.from('games')
		.insert({ title, players })
		.select();

	if (supabaseError) {
		console.error(supabaseError.code);
		return error(401, {
			message: 'Something went wrong'
		});
	}

	await getGames().refresh();

	return redirect(301, `/dashboard/${data[0].id}`);
});

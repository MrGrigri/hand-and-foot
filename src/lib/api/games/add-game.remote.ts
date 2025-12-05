import { form, getRequestEvent } from '$app/server';
import { addGameSchema } from '$lib/schemas/add-game-schema';
import { error, redirect } from '@sveltejs/kit';
import { getGames } from './get-games.remote';

export const addGame = form(addGameSchema, async ({ title, teams }) => {
	const {
		locals: { supabase }
	} = getRequestEvent();

	const { data, error: supabaseError } = await supabase
		.from('games')
		.insert({ title, total_teams: teams })
		.select();

	if (supabaseError) {
		return error(500, {
			message: 'Something went wrong'
		});
	}

	await getGames().refresh();

	return redirect(303, `/dashboard/${data[0].id}`);
});

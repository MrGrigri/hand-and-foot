import { getRandomNumber } from '$lib';
import type { Game } from '$lib/types/database/games';
import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import z from 'zod/v4';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const { data: games, error: databaseError } = await supabase.from('games').select<'*', Game>('*');

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

	return { games: games ?? [], tagline };
};

export const actions: Actions = {
	default: async ({ request, locals: { supabase } }) => {
		const formData = Object.fromEntries(await request.formData());
		const newGameSchema = z.object({
			title: z.string({ error: 'Title is required' }),
			players: z.enum(['4', '6', '8'])
		});

		const formResult = newGameSchema.safeParse(formData);
		const title = `${formData.title}`;
		const players = Number(formData.players);

		if (!formResult.success) {
			return fail(400, {
				success: false,
				data: { title, players },
				error: formResult.error.issues.map((e) => ({ [e.path[0]]: e.message }))
			});
		}

		const { data, error: supabaseError } = await supabase
			.from('games')
			.insert([{ title, players }])
			.select();

		if (supabaseError || !data) {
			return fail(400, {
				success: false,
				data: { title, players },
				error: supabaseError.message || 'Something went wrong'
			});
		}

		return {
			success: true,
			data,
			error: null
		};
	}
};

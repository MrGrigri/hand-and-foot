import { getRequestEvent, query } from '$app/server';
import { getGameSchema } from '$lib/schemas/get-game-schema';
import { isV4UUID } from '$lib/helpers/is-v4-uuid';
import { error } from '@sveltejs/kit';
import type { Game } from '$lib/types/database/games';
import type { RoundScore } from '$lib/types/database/round-scores';
import type { GameTeam } from '$lib/types/database/game-teams';

export const getGame = query(getGameSchema, async (id) => {
	const {
		locals: { supabase }
	} = getRequestEvent();

	if (!isV4UUID(id)) {
		return error(400, {
			message: 'Not a valid ID'
		});
	}

	try {
		const [gameResult, teamResult, roundResult] = (
			await Promise.allSettled([
				new Promise((resolve) => {
					resolve(supabase.from('games').select<'*', Game>('*').eq('id', id).single());
				}),
				new Promise((resolve) => {
					resolve(supabase.from('game_teams').select<'*', GameTeam>('*').eq('game_id', id));
				}),
				new Promise((resolve) => {
					resolve(supabase.from('round_scores').select<'*', RoundScore>('*').eq('game_id', id));
				})
			])
		).map((result) => {
			if (result.status === 'fulfilled') {
				// TODO: Figure out how to type the `result.value` properly
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				return (result.value as any).data;
			} else {
				throw error(500, {
					message: 'Something went wrong'
				});
			}
		});

		return {
			game: gameResult,
			teams: teamResult,
			rounds: roundResult
		};
	} catch {
		return error(500, {
			message: 'Something went wrong'
		});
	}
});

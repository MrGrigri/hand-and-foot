import * as v from 'valibot';

export const addGameSchema = v.object({
	title: v.pipe(v.string(), v.nonEmpty()),
	players: v.pipe(v.string(), v.nonEmpty())
});

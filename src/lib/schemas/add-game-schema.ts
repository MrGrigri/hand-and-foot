import * as v from 'valibot';

export const addGameSchema = v.object({
	title: v.pipe(v.string('Title must be a string'), v.nonEmpty('Title is required')),
	players: v.pipe(
		v.picklist(['4', '6', '8'], 'Player must be either 4, 6, or 8'),
		v.transform((value) => Number(value))
	)
});

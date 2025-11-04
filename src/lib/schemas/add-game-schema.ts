import * as v from 'valibot';

export const addGameSchema = v.object({
	title: v.pipe(v.string('Title must be a string'), v.nonEmpty('Title is required')),
	teams: v.pipe(
		v.picklist(['2', '3', '4'], 'Teams must be either 2, 3, or 4'),
		v.transform((value) => Number(value))
	)
});

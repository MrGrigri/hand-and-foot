import * as v from 'valibot';

export const addGameSchema = v.object({
	title: v.pipe(v.string('Title must be a string'), v.nonEmpty('Title is required')),
	teams: v.array(
		v.object({
			name: v.pipe(v.string('Name must be a string'), v.nonEmpty('Name is required'))
		})
	)
});

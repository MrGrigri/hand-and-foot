import * as v from 'valibot';

export const addRoundSchema = v.object({
	id: v.pipe(v.string('ID must be a string'), v.nonEmpty('The ID is required'))
});

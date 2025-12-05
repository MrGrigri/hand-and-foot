import * as v from 'valibot';

export const resetSchema = v.object({
	email: v.pipe(
		v.string('Email must be a string'),
		v.nonEmpty('Email is required'),
		v.email('Email is invalid'),
		v.trim()
	)
});

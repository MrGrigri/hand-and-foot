import * as v from 'valibot';

export const loginSchema = v.object({
	email: v.pipe(
		v.string('Email must be a string'),
		v.nonEmpty('Email is required'),
		v.email('Email is invalid')
	),
	password: v.pipe(v.string('Password must be a string'), v.nonEmpty('Password is required'))
});

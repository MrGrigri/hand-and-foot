import * as v from 'valibot';

export const registerSchema = v.object({
	email: v.pipe(
		v.string('Email is required'),
		v.nonEmpty('Email is required'),
		v.email('Email is invalid'),
		v.trim()
	),
	password: v.pipe(
		v.string('Password is required'),
		v.minLength(12, 'Password is too short'),
		v.regex(/[a-z]/, 'Password must have a lowercase character'),
		v.regex(/[A-Z]/, 'Password must have an uppercase character'),
		v.regex(/[!@#$%^&*()_\-+={[}\];:/?.><]/, 'Password must have a special character'),
		v.regex(/\d/, 'Password must have a number'),
		v.trim()
	)
});

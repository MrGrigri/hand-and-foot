import { form, getRequestEvent } from '$app/server';
import { error, redirect } from '@sveltejs/kit';
import { loginSchema } from './login-schema';

export const login = form(loginSchema, async ({ email, password }) => {
	const {
		locals: { supabase }
	} = getRequestEvent();

	const { error: supabaseError } = await supabase.auth.signInWithPassword({ email, password });

	if (supabaseError) {
		switch (supabaseError.code) {
			case 'validation_failed':
			case 'invalid_credentials':
			case 'email_not_confirmed':
				return error(401, {
					message: 'Username or password incorrect'
				});
			default:
				return error(401, {
					message: 'Something went wrong'
				});
		}
	}

	return redirect(303, 'dashboard');
});

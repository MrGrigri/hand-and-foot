import { form, getRequestEvent } from '$app/server';
import { registerSchema } from '$lib/schemas/register-schema';
import { error, redirect } from '@sveltejs/kit';

export const register = form(registerSchema, async ({ email, password }) => {
	const {
		locals: { supabase }
	} = getRequestEvent();

	const { error: supabaseError } = await supabase.auth.signUp({ email, password });

	if (supabaseError) {
		console.error(supabaseError.code);
		switch (supabaseError.code) {
			case 'signup_disabled':
				return error(401, {
					message: 'Currently, new users are not permitted to sign up'
				});
			case 'user_already_registered':
			case 'email_exists':
				return error(401, {
					message: 'Email already registered, please sign in'
				});
			default:
				return error(401, {
					message: 'Something went wrong'
				});
		}
	}

	return redirect(303, '/dashboard');
});

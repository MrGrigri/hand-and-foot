import { fail, redirect, type Actions } from '@sveltejs/kit';
import { z } from 'zod/v4';

export const actions: Actions = {
	default: async ({ request, locals: { supabase } }) => {
		const formData = Object.fromEntries(await request.formData());
		const loginSchema = z.object({
			email: z.email({ error: 'Email is invalid' }).trim(),
			password: z.string({ error: 'Password is required' }).trim()
		});

		const formResult = loginSchema.safeParse(formData);
		const email = formData.email as string;
		const password = formData.password as string;

		if (!formResult.success) {
			const errors = formResult.error.issues.map((e) => ({
				[e.path[0]]: e.message
			}));

			return fail(400, {
				data: email,
				errors
			});
		}

		const { error: supabaseError } = await supabase.auth.signInWithPassword({ email, password });

		if (supabaseError) {
			switch (supabaseError.code) {
				case 'validation_failed':
				case 'invalid_credentials':
				case 'email_not_confirmed':
					return fail(401, {
						data: email,
						errors: [{ supabase: 'Username or password incorrect' }]
					});
				default:
					return fail(500, {
						data: email,
						errors: [{ server: 'Something went wrong' }]
					});
			}
		}

		redirect(303, '/dashboard');
	}
};

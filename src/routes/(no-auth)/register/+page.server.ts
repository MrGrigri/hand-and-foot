import { fail, redirect, type Actions } from '@sveltejs/kit';
import { z } from 'zod/v4';

export const actions: Actions = {
	default: async ({ request, locals: { supabase } }) => {
		const formData = Object.fromEntries(await request.formData());
		const registerSchema = z.object({
			email: z.email({ error: 'Email is invalid' }).trim(),
			password: z
				.string({ error: 'Password is required' })
				.min(12, { error: 'Password is too short' })
				.regex(/[a-z]/, { error: 'Password must have a lowercase character' })
				.regex(/[A-Z]/, { error: 'Password must have an uppercase character' })
				.regex(/[!@#$%^&*()_\-+={[}\];:/?.><]/, { error: 'Password must have a special character' })
				.regex(/\d/, { error: 'Password must have a number' })
				.trim()
		});

		const formResult = registerSchema.safeParse(formData);
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

		const { error } = await supabase.auth.signUp({ email, password });

		if (error) {
			return fail(401, {
				data: email,
				errors: [{ supabase: 'User already exists' }]
			});
		} else {
			redirect(303, '/dashboard');
		}
	}
};

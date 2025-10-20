import { fail, redirect, type Actions } from '@sveltejs/kit';
import { z } from 'zod/v4';

export const actions: Actions = {
	default: async ({ request, locals: { supabase } }) => {
		const formData = Object.fromEntries(await request.formData());
		const resetSchema = z.object({
			email: z.email({ error: 'Email is invalid' }).trim()
		});

		const formResult = resetSchema.safeParse(formData);
		const email = `${formData.email}`;

		if (!formResult.success) {
			const errors = formResult.error.issues.map((e) => ({
				[e.path[0]]: e.message
			}));

			return fail(400, {
				data: email,
				errors
			});
		}

		const fromUrl = new URL(request.url);
		// TODO: Update to go to the user's settings page.
		const redirectTo = `${fromUrl.origin}/dashboard`;

		const { error: supabaseError } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo
		});

		if (supabaseError) {
			return fail(401, {
				data: email,
				errors: [{ server: 'Something went wrong' }]
			});
		}

		return redirect(303, '/login');
	}
};

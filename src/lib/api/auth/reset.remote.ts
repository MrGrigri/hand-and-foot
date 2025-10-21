import { getRequestEvent, form } from '$app/server';
import { resetSchema } from '$lib/schemas/reset-schema';
import { error, redirect } from '@sveltejs/kit';

export const reset = form(resetSchema, async ({ email }) => {
	const {
		request,
		locals: { supabase }
	} = getRequestEvent();

	const fromUrl = new URL(request.url);
	// TODO: Update to go to the user's settings page for changing their password.
	const redirectTo = `${fromUrl.origin}/dashboard`;

	const { error: supabaseError } = await supabase.auth.resetPasswordForEmail(email, {
		redirectTo
	});

	if (supabaseError) {
		return error(500, {
			message: 'something went wrong'
		});
	}

	return redirect(303, '/login');
});

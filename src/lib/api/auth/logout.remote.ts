import { getRequestEvent, query } from '$app/server';
import { error, redirect } from '@sveltejs/kit';

export const logout = query(async () => {
	const {
		locals: { supabase }
	} = getRequestEvent();

	const { error: supabaseError } = await supabase.auth.signOut();

	if (supabaseError) {
		return error(401, {
			message: supabaseError.message
		});
	}

	return redirect(303, '/login');
});

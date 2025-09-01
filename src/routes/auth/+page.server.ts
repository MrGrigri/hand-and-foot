import { redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	logout: async ({ locals: { supabase } }) => {
		const { error } = await supabase.auth.signOut();

		if (error) {
			console.error(error);
		} else {
			redirect(303, '/');
		}
	}
};

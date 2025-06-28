import { redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	login: async ({ request, locals: { supabase } }) => {
		const formData: FormData = await request.formData();
		const email = formData.get('login:email') as string;
		const password = formData.get('login:password') as string;

		const { error } = await supabase.auth.signInWithPassword({ email, password });

		if (error) {
			console.error(error);
			redirect(303, '/auth/error');
		} else {
			redirect(303, '/dashboard');
		}
	},
	register: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('register:email') as string;
		const password = formData.get('register:password') as string;

		const { error } = await supabase.auth.signUp({ email, password });

		if (error) {
			console.error(error);
			redirect(303, '/auth/error');
		} else {
			redirect(303, '/dashboard');
		}
	},
	logout: async ({ locals: { supabase } }) => {
		const { error } = await supabase.auth.signOut();

		if (error) {
			console.error(error);
		} else {
			redirect(303, '/');
		}
	}
};

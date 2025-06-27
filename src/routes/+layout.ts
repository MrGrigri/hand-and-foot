import {
	PUBLIC_SUPABASE_URL as supabaseUrl,
	PUBLIC_SUPABASE_ANON_KEY as supabaseAnonKey
} from '$env/static/public';
import { createBrowserClient, createServerClient, isBrowser } from '@supabase/ssr';
import type { LayoutLoad } from './$types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const load: LayoutLoad = async ({ fetch, data, depends }: any) => {
	depends('supabase:auth');

	const supabase = isBrowser()
		? createBrowserClient(supabaseUrl, supabaseAnonKey, { global: { fetch } })
		: createServerClient(supabaseUrl, supabaseAnonKey, {
				global: { fetch },
				cookies: {
					getAll() {
						return data?.cookies;
					},
					setAll() {}
				}
			});

	const {
		data: { session }
	} = await supabase.auth.getSession();

	return { supabase, session };
};

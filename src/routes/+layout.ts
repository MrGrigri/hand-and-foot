import { dev } from '$app/environment';
import {
	PUBLIC_SUPABASE_ANON_KEY as supabaseAnonKey,
	PUBLIC_SUPABASE_URL as supabaseUrl
} from '$env/static/public';
import { createBrowserClient, createServerClient, isBrowser } from '@supabase/ssr';
import { injectAnalytics } from '@vercel/analytics/sveltekit';
import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
import type { LayoutLoad } from './$types';

injectAnalytics({ mode: dev ? 'development' : 'production' });
injectSpeedInsights();

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
					}
				}
			});

	const {
		data: { session }
	} = await supabase.auth.getSession();

	const {
		data: { user }
	} = await supabase.auth.getUser();

	return { supabase, session, user };
};

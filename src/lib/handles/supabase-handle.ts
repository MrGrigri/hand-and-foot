import { createServerClient } from '@supabase/ssr';
import type { Handle } from '@sveltejs/kit';

import {
	PUBLIC_SUPABASE_API_KEY as supabaseAnonKey,
	PUBLIC_SUPABASE_URL as supabaseUrl
} from '$env/static/public';

export const supabaseHandle: Handle = async ({ event, resolve }) => {
	event.locals.supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
		cookies: {
			getAll: () => event.cookies.getAll(),
			setAll: (cookiesToSet) => {
				cookiesToSet.forEach(({ name, value, options }) => {
					event.cookies.set(name, value, { ...options, path: '/' });
				});
			}
		}
	});

	event.locals.safeGetSession = async () => {
		const { data: sessionData } = await event.locals.supabase.auth.getSession();

		if (!sessionData) return { session: null, claims: null };

		const { data: claimsData, error } = await event.locals.supabase.auth.getClaims();

		if (error || !claimsData) return { session: null, claims: null };

		return { session: sessionData?.session, claims: claimsData?.claims };
	};

	return resolve(event, {
		filterSerializedResponseHeaders: (name) =>
			name === 'content-range' || name === 'x-supabase-api-version'
	});
};

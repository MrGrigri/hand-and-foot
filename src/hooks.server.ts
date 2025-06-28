import {
	PUBLIC_SUPABASE_ANON_KEY as supabaseAnonKey,
	PUBLIC_SUPABASE_URL as supabaseUrl
} from '$env/static/public';
import { AUTHENTICATED_ROUTES, UNAUTHENTICATED_ROUTES } from '$lib';
import { createServerClient } from '@supabase/ssr';
import { type Handle, redirect } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const _stringContainsAnyFromArray = (mainString: string, stringArray: Array<string>) => {
	return stringArray.some((str: string) => mainString.includes(str));
};

const supabase: Handle = async ({ event, resolve }) => {
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
		const {
			data: { session }
		} = await event.locals.supabase.auth.getSession();

		if (!session) return { session: null, user: null };

		const {
			data: { user },
			error
		} = await event.locals.supabase.auth.getUser();

		if (error) return { session: null, user: null };

		return { session, user };
	};

	return resolve(event, {
		filterSerializedResponseHeaders: (name) =>
			name === 'content-range' || name === 'x-supabase-api-version'
	});
};

const authGuard: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/.well-known')) {
		return new Response(null, { status: 204 }); // Return empty response with 204 No Content
	}

	const { session, user } = await event.locals.safeGetSession();
	const pathName = event.url.pathname;

	event.locals.session = session;
	event.locals.user = user;

	const isAuthenticatedRoute = _stringContainsAnyFromArray(pathName, AUTHENTICATED_ROUTES);
	const isNotAuthenticated = !event.locals.session && isAuthenticatedRoute;

	if (isNotAuthenticated) redirect(303, '/login');

	const isNotAuthenticatedRoute = _stringContainsAnyFromArray(pathName, UNAUTHENTICATED_ROUTES);
	const isAuthenticated = event.locals.session && isNotAuthenticatedRoute;

	if (isAuthenticated) redirect(303, '/dashboard');

	return resolve(event);
};

export const handle: Handle = sequence(supabase, authGuard);

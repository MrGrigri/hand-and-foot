import { type Handle, redirect } from '@sveltejs/kit';

import { AUTHENTICATED_ROUTES, UNAUTHENTICATED_ROUTES } from '$lib/constants';
import { stringContainsAnyFromArray } from '$lib/helpers';

export const authGuardHandle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/.well-known')) {
		return new Response(null, { status: 204 });
	}

	const { session, claims: user } = await event.locals.safeGetSession();
	const pathName = event.url.pathname;

	event.locals.session = session;
	event.locals.claims = user;

	const isAuthenticatedRoute = stringContainsAnyFromArray(pathName, AUTHENTICATED_ROUTES);
	const isNotAuthenticated = !event.locals.session && isAuthenticatedRoute;

	if (isNotAuthenticated) redirect(303, '/login');

	const isNotAuthenticatedRoute = stringContainsAnyFromArray(pathName, UNAUTHENTICATED_ROUTES);
	const isAuthenticated = event.locals.session && isNotAuthenticatedRoute;

	if (isAuthenticated) redirect(303, '/dashboard');

	return resolve(event);
};

import * as v from 'valibot';

import { query } from '$app/server';

import { getAllTaglines } from './get-taglines.remote';
import { error } from '@sveltejs/kit';

export const getTagline = query(v.number(), async (index) => {
	const taglines = await getAllTaglines();

	if (index > taglines.length - 1 || index < 0) {
		error(416, {
			message: `Index is out of range. Passed index: ${index}, max index: ${taglines.length - 1}`
		});
	}

	return taglines[index];
});

import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { isV4UUID } from '$lib/helpers/is-v4-uuid';

export const load: PageLoad = ({ params }) => {
	if (!isV4UUID(params.gameId)) {
		return error(400, {
			message: 'Not a valid ID'
		});
	}

	return {
		gameId: params.gameId
	};
};

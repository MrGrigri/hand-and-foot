import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

const isV4UUID = (id: string): boolean =>
	/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);

export const load: PageLoad = ({ params }) => {
	if (!isV4UUID(params.gameId)) {
		throw error(404, {
			message: 'Not a valid ID'
		});
	}

	return {
		gameId: params.gameId
	};
};

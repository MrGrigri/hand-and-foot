import { form } from '$app/server';
import { addRoundSchema } from '$lib/schemas/add-round-schema';

export const addRound = form(addRoundSchema, async ({ id }) => {
	console.log(id);
});

import { query } from '$app/server';

export const getAllTaglines = query(async () => {
	const taglines = [
		`You must feel so lonely!`,
		`Why don't you have any friends?`,
		`Don't play with yourself! Play with others!!`,
		`There had better be a good reason for no games!`
	];

	return taglines;
});

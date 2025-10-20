import { expect, describe, it } from 'vitest';
import * as v from 'valibot';
import { addGameSchema } from './add-game-schema';
import { faker } from '@faker-js/faker';

describe('addGameSchema', () => {
	it('Should have a title and players', () => {
		const fakeTitle = faker.word.words(2);
		const fakePlayers = faker.helpers.arrayElement(['4', '6', '8']);
		const result = v.safeParse(addGameSchema, {
			title: fakeTitle,
			players: fakePlayers
		});

		expect(result.success).toBe(true);
		expect(result.output).toEqual({
			title: fakeTitle,
			players: Number(fakePlayers)
		});
	});

	describe('title', () => {
		it('Should be unsuccessful when no title is provided', () => {
			const fakePlayers = faker.helpers.arrayElement(['4', '6', '8']);

			const result = v.safeParse(addGameSchema, {
				players: fakePlayers
			});

			expect(result.success).toBe(false);
			expect(result.issues?.[0].kind).toBe('schema');
			expect(result.issues?.[0].message).toBe(
				'Invalid key: Expected "title" but received undefined'
			);
		});

		it('Should be unsuccessful when an empty title is provided', () => {
			const fakeTitle = '';
			const fakePlayers = faker.helpers.arrayElement(['4', '6', '8']);

			const result = v.safeParse(addGameSchema, {
				title: fakeTitle,
				players: fakePlayers
			});

			expect(result.success).toBe(false);
			expect(result.issues?.[0].kind).toBe('validation');
			expect(result.issues?.[0].message).toBe('Title is required');
		});

		it('Should be unsuccessful when something other than a string is provided', () => {
			const fakeTitle = true;
			const fakePlayers = faker.helpers.arrayElement(['4', '6', '8']);

			const result = v.safeParse(addGameSchema, {
				title: fakeTitle,
				players: fakePlayers
			});

			expect(result.success).toBe(false);
			expect(result.issues?.[0].kind).toBe('schema');
			expect(result.issues?.[0].message).toBe('Title must be a string');
		});
	});

	describe('players', () => {
		it('Should be unsuccessful if no players are passed', () => {
			const fakeTitle = faker.word.words(2);

			const result = v.safeParse(addGameSchema, {
				title: fakeTitle
			});

			expect(result.success).toBe(false);
			expect(result.issues?.[0].kind).toBe('schema');
			expect(result.issues?.[0].message).toBe(
				'Invalid key: Expected "players" but received undefined'
			);
		});

		it('Should be unsuccessful if a play passed is not 4, 6, or 8', () => {
			const fakeTitle = faker.word.words(2);
			const fakePlayers = faker.helpers.arrayElement(['1', '2', '3', '5', '7', '9']);

			const result = v.safeParse(addGameSchema, {
				title: fakeTitle,
				players: fakePlayers
			});

			expect(result.success).toBe(false);
			expect(result.issues?.[0].kind).toBe('schema');
			expect(result.issues?.[0].message).toBe('Player must be either 4, 6, or 8');
		});
	});
});

import { expect, describe, it } from 'vitest';
import * as v from 'valibot';
import { addGameSchema } from './add-game-schema';
import { faker } from '@faker-js/faker';

describe('addGameSchema', () => {
	it('Should have a title and teams', () => {
		const fakeTitle = faker.word.words(2);
		const fakeName = `${faker.word.adjective()} ${faker.word.noun()}`;
		const fakeTeams = [{ name: fakeName }];
		const result = v.safeParse(addGameSchema, {
			title: fakeTitle,
			teams: fakeTeams
		});

		expect(result.success).toBe(true);
		expect(result.output).toEqual({
			title: fakeTitle,
			teams: [{ name: fakeName }]
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

	describe('teams', () => {
		it('Should be unsuccessful if no teams are passed', () => {
			const fakeTitle = faker.word.words(2);

			const result = v.safeParse(addGameSchema, {
				title: fakeTitle
			});

			expect(result.success).toBe(false);
			expect(result.issues?.[0].kind).toBe('schema');
			expect(result.issues?.[0].message).toBe(
				'Invalid key: Expected "teams" but received undefined'
			);
		});
	});
});

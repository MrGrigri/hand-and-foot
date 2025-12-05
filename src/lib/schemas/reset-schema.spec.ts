import * as v from 'valibot';
import { faker } from '@faker-js/faker';
import { describe, expect, it } from 'vitest';
import { resetSchema } from './reset-schema';

describe('resetSchema', () => {
	it('Should have an email', () => {
		const fakeEmail = faker.internet.email();

		const result = v.safeParse(resetSchema, {
			email: fakeEmail
		});

		expect(result.success).toBe(true);
		expect(result.output).toEqual({
			email: fakeEmail
		});
	});

	describe('email', () => {
		it('Should be unsuccessful if an email is not provided', () => {
			const result = v.safeParse(resetSchema, {});

			expect(result.success).toBe(false);
			expect(result.issues?.[0].message).toBe(
				'Invalid key: Expected "email" but received undefined'
			);
		});

		it('Should be unsuccessful when something other than a string is provided', () => {
			const fakeEmail = false;

			const result = v.safeParse(resetSchema, {
				email: fakeEmail
			});

			expect(result.success).toBe(false);
			expect(result.issues?.[0].kind).toBe('schema');
			expect(result.issues?.[0].message).toBe('Email must be a string');
		});

		it('Should be unsuccessful when an empty email is provided', () => {
			const fakeEmail = '';

			const result = v.safeParse(resetSchema, {
				email: fakeEmail
			});

			expect(result.success).toBe(false);
			expect(result.issues?.[0].kind).toBe('validation');
			expect(result.issues?.[0].message).toBe('Email is required');
		});

		it('Should be unsuccessful when an email is not an email', () => {
			const fakeEmail = faker.string.alpha({ length: 16 });

			const result = v.safeParse(resetSchema, {
				email: fakeEmail
			});

			expect(result.success).toBe(false);
			expect(result.issues?.[0].kind).toBe('validation');
			expect(result.issues?.[0].message).toBe('Email is invalid');
		});
	});
});

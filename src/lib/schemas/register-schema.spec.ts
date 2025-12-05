import { describe, expect, it } from 'vitest';
import * as v from 'valibot';
import { registerSchema } from './register-schema';
import { faker } from '@faker-js/faker';

const passingPassword = 'asdf4321ASDF$#@!';

describe('registerSchema', () => {
	it('Should have an email and password', () => {
		const fakeEmail = faker.internet.email();
		const fakePassword = passingPassword;
		const result = v.safeParse(registerSchema, {
			email: fakeEmail,
			password: fakePassword
		});

		expect(result.success).toBe(true);
		expect(result.output).toEqual({
			email: fakeEmail,
			password: fakePassword
		});
	});

	describe('email', () => {
		it('Should be unsuccessful if an email is not provided', () => {
			const fakePassword = passingPassword;
			const result = v.safeParse(registerSchema, {
				password: fakePassword
			});

			expect(result.success).toBe(false);
			expect(result.issues?.[0].message).toBe(
				'Invalid key: Expected "email" but received undefined'
			);
		});

		it('Should be unsuccessful when something other than a string is provided', () => {
			const fakeEmail = true;
			const fakePassword = passingPassword;
			const result = v.safeParse(registerSchema, {
				email: fakeEmail,
				password: fakePassword
			});

			expect(result.success).toBe(false);
			expect(result.issues?.[0].kind).toBe('schema');
			expect(result.issues?.[0].message).toBe('Email must be a string');
		});

		it('Should be unsuccessful when an empty email is provided', () => {
			const fakeEmail = '';
			const fakePassword = passingPassword;
			const result = v.safeParse(registerSchema, {
				email: fakeEmail,
				password: fakePassword
			});

			expect(result.success).toBe(false);
			expect(result.issues?.[0].kind).toBe('validation');
			expect(result.issues?.[0].message).toBe('Email is required');
		});

		it('Should be unsuccessful when an email is not an email', () => {
			const fakeEmail = faker.string.alpha({ length: 16 });
			const fakePassword = passingPassword;
			const result = v.safeParse(registerSchema, {
				email: fakeEmail,
				password: fakePassword
			});

			expect(result.success).toBe(false);
			expect(result.issues?.[0].kind).toBe('validation');
			expect(result.issues?.[0].message).toBe('Email is invalid');
		});
	});
});

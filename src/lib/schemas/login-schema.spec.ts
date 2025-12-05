import { describe, expect, it } from 'vitest';
import * as v from 'valibot';
import { loginSchema } from './login-schema';
import { faker } from '@faker-js/faker';

describe('loginSchema', () => {
	it('Should have an email and password', () => {
		const fakeEmail = faker.internet.email();
		const fakePassword = faker.internet.password();
		const result = v.safeParse(loginSchema, {
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
			const fakePassword = faker.internet.password();
			const result = v.safeParse(loginSchema, {
				password: fakePassword
			});

			expect(result.success).toBe(false);
			expect(result.issues?.[0].message).toBe(
				'Invalid key: Expected "email" but received undefined'
			);
		});

		it('Should be unsuccessful when something other than a string is provided', () => {
			const fakeEmail = true;
			const fakePassword = faker.internet.password();
			const result = v.safeParse(loginSchema, {
				email: fakeEmail,
				password: fakePassword
			});

			expect(result.success).toBe(false);
			expect(result.issues?.[0].kind).toBe('schema');
			expect(result.issues?.[0].message).toBe('Email must be a string');
		});

		it('Should be unsuccessful when an empty email is provided', () => {
			const fakeEmail = '';
			const fakePassword = faker.internet.password();
			const result = v.safeParse(loginSchema, {
				email: fakeEmail,
				password: fakePassword
			});

			expect(result.success).toBe(false);
			expect(result.issues?.[0].kind).toBe('validation');
			expect(result.issues?.[0].message).toBe('Email is required');
		});

		it('Should be unsuccessful when an email is not an email', () => {
			const fakeEmail = faker.string.alpha({ length: 16 });
			const fakePassword = faker.internet.password();
			const result = v.safeParse(loginSchema, {
				email: fakeEmail,
				password: fakePassword
			});

			expect(result.success).toBe(false);
			expect(result.issues?.[0].kind).toBe('validation');
			expect(result.issues?.[0].message).toBe('Email is invalid');
		});
	});

	describe('password', () => {
		it('Should be unsuccessful if an password is not provided', () => {
			const fakeEmail = faker.internet.email();
			const result = v.safeParse(loginSchema, {
				email: fakeEmail
			});

			expect(result.success).toBe(false);
			expect(result.issues?.[0].message).toBe(
				'Invalid key: Expected "password" but received undefined'
			);
		});

		it('Should be unsuccessful when something other than a string is provided', () => {
			const fakeEmail = faker.internet.email();
			const fakePassword = true;
			const result = v.safeParse(loginSchema, {
				email: fakeEmail,
				password: fakePassword
			});

			expect(result.success).toBe(false);
			expect(result.issues?.[0].kind).toBe('schema');
			expect(result.issues?.[0].message).toBe('Password must be a string');
		});

		it('Should be unsuccessful when an empty password is provided', () => {
			const fakeEmail = faker.internet.email();
			const fakePassword = '';
			const result = v.safeParse(loginSchema, {
				email: fakeEmail,
				password: fakePassword
			});

			expect(result.success).toBe(false);
			expect(result.issues?.[0].kind).toBe('validation');
			expect(result.issues?.[0].message).toBe('Password is required');
		});
	});
});

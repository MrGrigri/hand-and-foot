import { describe, expect, it } from 'vitest';
import { registerSchema } from './register-schema';

describe('registerSchema', () => {
	it('Should have an email and password', () => {
		expect(registerSchema.entries.email).toBeTruthy();
		expect(registerSchema.entries.email.type).toBe('string');
		expect(registerSchema.entries.email.pipe[0].type).toBe('string');
		expect(registerSchema.entries.email.pipe[0].message).toBe('Email is required');
		expect(registerSchema.entries.email.pipe[1].type).toBe('non_empty');
		expect(registerSchema.entries.email.pipe[1].message).toBe('Email is required');
		expect(registerSchema.entries.email.pipe[2].type).toBe('email');
		expect(registerSchema.entries.email.pipe[2].message).toBe('Email is invalid');

		expect(registerSchema.entries.password).toBeTruthy();
		expect(registerSchema.entries.password.type).toBe('string');
		expect(registerSchema.entries.password.pipe[0].type).toBe('string');
		expect(registerSchema.entries.password.pipe[0].message).toBe('Password is required');
		expect(registerSchema.entries.password.pipe[1].type).toBe('min_length');
		expect(registerSchema.entries.password.pipe[1].message).toBe('Password is too short');
		expect(registerSchema.entries.password.pipe[2].type).toBe('regex');
		expect(registerSchema.entries.password.pipe[2].message).toBe(
			'Password must have a lowercase character'
		);
		expect(registerSchema.entries.password.pipe[3].type).toBe('regex');
		expect(registerSchema.entries.password.pipe[3].message).toBe(
			'Password must have an uppercase character'
		);
		expect(registerSchema.entries.password.pipe[4].type).toBe('regex');
		expect(registerSchema.entries.password.pipe[4].message).toBe(
			'Password must have a special character'
		);
		expect(registerSchema.entries.password.pipe[5].type).toBe('regex');
		expect(registerSchema.entries.password.pipe[5].message).toBe('Password must have a number');
	});
});

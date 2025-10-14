import { describe, expect, it } from 'vitest';
import { loginSchema } from './login-schema';

describe('loginSchema', () => {
	it('Should have an email and password', () => {
		expect(loginSchema.entries.email).toBeTruthy();
		expect(loginSchema.entries.email.type).toBe('string');
		expect(loginSchema.entries.email.pipe[0].type).toBe('string');
		expect(loginSchema.entries.email.pipe[1].type).toBe('non_empty');
		expect(loginSchema.entries.email.pipe[2].type).toBe('email');

		expect(loginSchema.entries.password).toBeTruthy();
		expect(loginSchema.entries.password.type).toBe('string');
		expect(loginSchema.entries.password.pipe[0].type).toBe('string');
		expect(loginSchema.entries.password.pipe[1].type).toBe('non_empty');
	});
});

import { expect, describe, it } from 'vitest';
import * as v from 'valibot';
import { faker } from '@faker-js/faker';
import { addRoundSchema } from './add-round-schema';

describe('addRoundSchema', () => {
	it('Should be a valid schema', () => {
		const fakeId = faker.string.uuid();

		const result = v.safeParse(addRoundSchema, { id: fakeId });

		expect(result.success).toBe(true);
	});

	it('Should be invalid with something other than a string', () => {
		const fakeId = faker.number.int();

		const result = v.safeParse(addRoundSchema, { id: fakeId });

		expect(result.success).toBe(false);
		expect(result.issues?.[0].kind).toBe('schema');
		expect(result.issues?.[0].message).toBe('ID must be a string');
	});

	it('Should be invalid if empty', () => {
		const result = v.safeParse(addRoundSchema, { id: '' });

		expect(result.success).toBe(false);
		expect(result.issues?.[0].kind).toBe('validation');
		expect(result.issues?.[0].message).toBe('The ID is required');
	});
});

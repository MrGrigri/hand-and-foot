import { faker } from '@faker-js/faker';
import { describe, expect, it } from 'vitest';
import { isV4UUID } from './is-v4-uuid';

const exclusions = 'ghijklmnopqrstuvwxyz';
const segment = (length: number) =>
	faker.string.alphanumeric({ length, casing: 'lower', exclude: exclusions });
const uuid = (segments: Array<string>) => segments.join('-');

describe('isV4UUID', () => {
	it('Should return true using fakerJs', () => {
		const fakeUuid = faker.string.uuid();

		expect(isV4UUID(fakeUuid)).toBe(true);
	});

	it('Should return true', () => {
		const segmentOne = segment(8);
		const segmentTwo = segment(4);
		const segmentThree = `4${segment(3)}`;
		const segmentFour = `${faker.helpers.arrayElement('89ab'.split(''))}${segment(3)}`;
		const segmentFive = segment(12);

		const fakeUuid = uuid([segmentOne, segmentTwo, segmentThree, segmentFour, segmentFive]);

		expect(isV4UUID(fakeUuid)).toBe(true);
	});

	it('Should return false if first segments does not have 8 characters', () => {
		const segmentOne = segment(7);
		const segmentTwo = segment(4);
		const segmentThree = `4${segment(3)}`;
		const segmentFour = `${faker.helpers.arrayElement('89ab'.split(''))}${segment(3)}`;
		const segmentFive = segment(12);

		const fakeUuid = uuid([segmentOne, segmentTwo, segmentThree, segmentFour, segmentFive]);

		expect(isV4UUID(fakeUuid)).toBe(false);
	});

	it('Should return false if second segments does not have 4 characters', () => {
		const segmentOne = segment(8);
		const segmentTwo = segment(3);
		const segmentThree = `4${segment(3)}`;
		const segmentFour = `${faker.helpers.arrayElement('89ab'.split(''))}${segment(3)}`;
		const segmentFive = segment(12);

		const fakeUuid = uuid([segmentOne, segmentTwo, segmentThree, segmentFour, segmentFive]);

		expect(isV4UUID(fakeUuid)).toBe(false);
	});

	it('Should return false if third segments does not have 4 characters', () => {
		const segmentOne = segment(8);
		const segmentTwo = segment(4);
		const segmentThree = `4${segment(2)}`;
		const segmentFour = `${faker.helpers.arrayElement('89ab'.split(''))}${segment(3)}`;
		const segmentFive = segment(12);

		const fakeUuid = uuid([segmentOne, segmentTwo, segmentThree, segmentFour, segmentFive]);

		expect(isV4UUID(fakeUuid)).toBe(false);
	});

	it('Should return false if third segments does not have a starting character as a 4', () => {
		const segmentOne = segment(8);
		const segmentTwo = segment(4);
		const segmentThree = `a${segment(3)}`;
		const segmentFour = `${faker.helpers.arrayElement('89ab'.split(''))}${segment(3)}`;
		const segmentFive = segment(12);

		const fakeUuid = uuid([segmentOne, segmentTwo, segmentThree, segmentFour, segmentFive]);

		expect(isV4UUID(fakeUuid)).toBe(false);
	});

	it('Should return false if fourth segments does not have 4 characters', () => {
		const segmentOne = segment(8);
		const segmentTwo = segment(4);
		const segmentThree = `4${segment(3)}`;
		const segmentFour = `${faker.helpers.arrayElement('89ab'.split(''))}${segment(2)}`;
		const segmentFive = segment(12);

		const fakeUuid = uuid([segmentOne, segmentTwo, segmentThree, segmentFour, segmentFive]);

		expect(isV4UUID(fakeUuid)).toBe(false);
	});

	it('Should return false if fourth segments does not have a starting character as 8, 9, a, or b', () => {
		const segmentOne = segment(8);
		const segmentTwo = segment(4);
		const segmentThree = `4${segment(3)}`;
		const segmentFour = `c${segment(3)}`;
		const segmentFive = segment(12);

		const fakeUuid = uuid([segmentOne, segmentTwo, segmentThree, segmentFour, segmentFive]);

		expect(isV4UUID(fakeUuid)).toBe(false);
	});

	it('Should return false if fifth segments does not have 12 characters', () => {
		const segmentOne = segment(8);
		const segmentTwo = segment(4);
		const segmentThree = `4${segment(3)}`;
		const segmentFour = `${faker.helpers.arrayElement('89ab'.split(''))}${segment(3)}`;
		const segmentFive = segment(11);

		const fakeUuid = uuid([segmentOne, segmentTwo, segmentThree, segmentFour, segmentFive]);

		expect(isV4UUID(fakeUuid)).toBe(false);
	});
});

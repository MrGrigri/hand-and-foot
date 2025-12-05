import { faker } from '@faker-js/faker';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { addToast, getToastIcon, removeAllToasts, removeToast, toasts } from './toast';
import type { Toast } from '$lib/types/toast/toast';

vi.mock('@mdi/js', () => ({
	mdiAlertOutline: '4',
	mdiAlertRhombusOutline: '3',
	mdiHelpCircleOutline: '1',
	mdiInformationSlabCircleOutline: '2'
}));

type UUIDString = `${string}-${string}-${string}-${string}-${string}`;

const randomToast = (id: UUIDString): Toast => {
	return {
		id: id,
		message: faker.string.alpha(),
		type: faker.helpers.arrayElement(['default', 'error', 'info', 'warning'])
	};
};

describe('addToast', () => {
	let randomUUIDSpy: ReturnType<typeof vi.spyOn>;
	let randomUUID: UUIDString;

	beforeEach(() => {
		vi.useFakeTimers();

		randomUUID = faker.string.uuid() as UUIDString;
		randomUUIDSpy = vi.spyOn(crypto, 'randomUUID').mockReturnValue(randomUUID);
	});

	afterEach(() => {
		vi.useRealTimers();

		randomUUIDSpy.mockRestore();
	});

	it('Should add a toast with defaults', async () => {
		const fakeMessage = faker.string.alpha();

		addToast(fakeMessage);

		const toast = toasts.get(randomUUID);

		expect(toasts.has(randomUUID)).toBe(true);
		expect(toast!.id).toBe(randomUUID);
		expect(toast!.message).toBe(fakeMessage);
		expect(toast!.type).toBe('default');

		await vi.advanceTimersByTimeAsync(3000);

		expect(toasts.has(randomUUID)).toBe(false);
	});

	it('Should add a toast with a type', async () => {
		const fakeMessage = faker.string.alpha();
		const fakeType = faker.helpers.arrayElement(['default', 'error', 'info', 'warning']);

		addToast(fakeMessage, fakeType);

		const toast = toasts.get(randomUUID);

		expect(toasts.has(randomUUID)).toBe(true);
		expect(toast!.id).toBe(randomUUID);
		expect(toast!.message).toBe(fakeMessage);
		expect(toast!.type).toBe(fakeType);

		await vi.advanceTimersByTimeAsync(3000);

		expect(toasts.has(randomUUID)).toBe(false);
	});

	it('Should add a toast with a delay', async () => {
		const fakeMessage = faker.string.alpha();
		const fakeType = faker.helpers.arrayElement(['default', 'error', 'info', 'warning']);
		const fakeDelay = faker.number.int({ min: 1000, max: 5000 });

		addToast(fakeMessage, fakeType, fakeDelay);

		const toast = toasts.get(randomUUID);

		expect(toasts.has(randomUUID)).toBe(true);
		expect(toast!.id).toBe(randomUUID);
		expect(toast!.message).toBe(fakeMessage);
		expect(toast!.type).toBe(fakeType);

		await vi.advanceTimersByTimeAsync(fakeDelay);

		expect(toasts.has(randomUUID)).toBe(false);
	});
});

describe('removeToast', () => {
	it('Should remove a toast', async () => {
		const randomUUID = faker.string.uuid() as UUIDString;

		toasts.set(randomUUID, randomToast(randomUUID));

		expect(toasts.has(randomUUID)).toBe(true);

		removeToast(randomUUID);

		expect(toasts.has(randomUUID)).toBe(false);
	});
});

describe('removeAllTodos', () => {
	it('Should remove all Todos', () => {
		const iterations = faker.number.int({ min: 1, max: 10 });

		for (let i = 0; i < iterations; i++) {
			const randomUUID = faker.string.uuid() as UUIDString;

			toasts.set(randomUUID, randomToast(randomUUID));
		}

		expect(toasts.size).toBe(iterations);

		removeAllToasts();

		expect(toasts.size).toBe(0);
	});
});

describe('getToastIcon', () => {
	it('Should get the appropriate icon path for default', () => {
		expect(getToastIcon('default')).toBe('1');
	});

	it('Should get the appropriate icon path for info', () => {
		expect(getToastIcon('info')).toBe('2');
	});

	it('Should get the appropriate icon path for warning', () => {
		expect(getToastIcon('warning')).toBe('3');
	});

	it('Should get the appropriate icon path for error', () => {
		expect(getToastIcon('error')).toBe('4');
	});
});

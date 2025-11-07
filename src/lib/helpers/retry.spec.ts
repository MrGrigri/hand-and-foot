import { describe, expect, it, vi } from 'vitest';
import { retry } from './retry';

describe('retry helper', () => {
	it('returns value on first try', async () => {
		const fn = vi.fn(async () => 'ok');

		await expect(retry(fn, 3, 1)).resolves.toBe('ok');
		expect(fn).toHaveBeenCalledTimes(1);
	});

	it('retries until success', async () => {
		let calls = 0;
		const fn = vi.fn(async () => {
			calls += 1;
			if (calls < 3) throw new Error('transient');
			return 'done';
		});

		await expect(retry(fn, 5, 1)).resolves.toBe('done');
		expect(fn).toHaveBeenCalledTimes(3);
	});

	it('throws after exhausting attempts', async () => {
		const fn = vi.fn(async () => {
			throw new Error('always fail');
		});

		await expect(retry(fn, 3, 1)).rejects.toThrow('always fail');
		expect(fn).toHaveBeenCalledTimes(3);
	});
});

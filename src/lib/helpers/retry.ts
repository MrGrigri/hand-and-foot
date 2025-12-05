/**
 * Simple retry helper with exponential backoff.
 * fn should throw on failure.
 */
export const retry = async <T>(
	fn: () => Promise<T>,
	attempts = 3,
	initialDelayMs = 100
): Promise<T> => {
	let lastError: unknown;
	let delay = initialDelayMs;

	for (let i = 0; i < attempts; i++) {
		try {
			return await fn();
		} catch (err) {
			lastError = err;
			if (i < attempts - 1) {
				await new Promise((res) => setTimeout(res, delay));
				delay *= 2;
			}
		}
	}

	throw lastError;
};

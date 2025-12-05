import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { readFileSync } from 'node:fs';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		https: {
			key: readFileSync(`${__dirname}/.dev/certs/dev.handandfoot-key.pem`),
			cert: readFileSync(`${__dirname}/.dev/certs/dev.handandfoot.pem`)
		}
	},
	test: {
		projects: [
			{
				extends: './vite.config.ts',
				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
				}
			}
		]
	}
});

<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageProps } from './$types';

	let { form }: PageProps = $props();
</script>

<h2>Login</h2>

<a href="/register">Register</a>

<form method="POST" use:enhance>
	<div>
		<label for="email">Email:</label>
		<input required id="email" type="email" name="email" autocomplete="email" inputmode="email" />
	</div>

	<div>
		<label for="password">Password:</label>
		<input
			id="password"
			type="password"
			name="password"
			autocomplete="current-password"
			inputmode="text"
		/>
	</div>

	<button type="submit">Submit</button>
</form>

<div id="errors" role="alert" aria-live="polite">
	{#if form?.errors}
		<p>{Object.values(form.errors[0])[0]}</p>
	{/if}
</div>

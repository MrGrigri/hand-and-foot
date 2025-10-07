<script lang="ts">
	import { login } from './login.remote';
	import { loginSchema } from './login';
	import { addToast } from '$lib/stores';
	import { isHttpError } from '@sveltejs/kit';

	let isSubmitting = $state(false);
	let showPassword: boolean = $state(false);
	let passwordSwitchText: 'Show' | 'Hide' = $state('Show');

	let { email, password } = login.fields;

	const handleShowPasswordClick = () => {
		showPassword = !showPassword;
	};

	const handleLoginEnhance = async ({ submit }: any) => {
		try {
			isSubmitting = true;

			await submit();
		} catch (error) {
			if (isHttpError(error)) {
				addToast(error.body.message, 'error');
			} else {
				addToast('Something went wrong', 'error');
			}
		} finally {
			isSubmitting = false;
		}
	};
</script>

<svelte:head>
	<title>Hand & Foot - Login</title>

	<meta name="description" content="Login to your account" />
</svelte:head>

<h2>Login</h2>

<a href="/register">Register</a>
<a href="/reset">Forgot password?</a>

<svelte:boundary>
	<form {...login.preflight(loginSchema).enhance(handleLoginEnhance)}>
		<div>
			<label for="email">Email:</label>
			<input id="email" autocomplete="email" inputmode="email" {...email.as('email')} />
			{#each email.issues() ?? [] as issue}
				<p>{issue.message}</p>
			{/each}
		</div>

		<div>
			<label for="password">Password:</label>
			<input
				id="password"
				autocomplete="current-password"
				inputmode="text"
				{...password.as(showPassword ? 'text' : 'password')}
			/>
			<button
				type="button"
				role="switch"
				aria-checked={showPassword}
				aria-label="{passwordSwitchText} password"
				onclick={handleShowPasswordClick}>{passwordSwitchText}</button
			>
			{#each password.issues() ?? [] as issue}
				<p>{issue.message}</p>
			{/each}
		</div>

		<button type="submit" disabled={isSubmitting || null}>Submit</button>
	</form>
</svelte:boundary>

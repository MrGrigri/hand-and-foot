<script lang="ts">
	import { isHttpError } from '@sveltejs/kit';

	import { login } from '$lib/api/auth';
	import { loginSchema } from '$lib/schemas';
	import { addToast } from '$lib/stores';
	import type { InputEvent } from '$lib/types/utils/input-event';

	let isSubmitting = $state(false);
	let showPassword: boolean = $state(false);
	let formIsValid: boolean = $state(false);
	let emailValue: string = $state('');
	let emailIsValid: boolean = $state(false);
	let passwordIsValid = $state(false);
	let passwordSwitchText: 'Show' | 'Hide' = $state('Show');

	$effect(() => {
		passwordSwitchText = showPassword ? 'Hide' : 'Show';
		formIsValid = emailIsValid && passwordIsValid;
	});

	let { email, password } = login.fields;

	const handleEmailInput = ({ currentTarget }: InputEvent<HTMLInputElement>) => {
		emailValue = currentTarget.value;

		emailIsValid = currentTarget.checkValidity() ? true : false;
	};

	const handlePasswordInput = ({ currentTarget }: InputEvent<HTMLInputElement>) => {
		passwordIsValid = currentTarget.checkValidity() ? true : false;
	};

	const handleShowPasswordClick = () => {
		showPassword = !showPassword;
	};

	const handleLoginEnhance = async ({ submit }: any) => {
		try {
			isSubmitting = true;

			await submit();

			addToast('You are being logged in', 'info');
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
			<input
				required
				id="email"
				autocomplete="email"
				inputmode="email"
				oninput={handleEmailInput}
				{...email.as('email')}
			/>
			{#if email.issues()?.[0]}
				{@const issue = email.issues()?.[0]}

				<p>{issue?.message}</p>
			{/if}
		</div>

		<div>
			<label for="password">Password:</label>
			<input
				required
				id="password"
				autocomplete="current-password"
				inputmode="text"
				oninput={handlePasswordInput}
				{...password.as(showPassword ? 'text' : 'password')}
			/>
			<button
				type="button"
				role="switch"
				aria-checked={showPassword}
				aria-label="{passwordSwitchText} password"
				onclick={handleShowPasswordClick}>{passwordSwitchText}</button
			>
			{#if password.issues()?.[0]}
				{@const issue = password.issues()?.[0]}
				<p>{issue?.message}</p>
			{/if}
		</div>

		<button
			type="submit"
			disabled={!formIsValid || isSubmitting || null}
			aria-disabled={!formIsValid || isSubmitting || null}
			aria-busy={isSubmitting}>Submit</button
		>
	</form>
</svelte:boundary>

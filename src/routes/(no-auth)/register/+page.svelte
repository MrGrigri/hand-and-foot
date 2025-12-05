<script lang="ts">
	import { mdiCheck, mdiClose } from '@mdi/js';
	import { isHttpError } from '@sveltejs/kit';

	import { register } from '$lib/api/auth/register.remote';
	import Icon from '$lib/components/icon/Icon.svelte';
	import { registerSchema } from '$lib/schemas/register-schema';
	import { addToast } from '$lib/stores';
	import type { Rule, Rules } from '$lib/types/rules/rules';
	import type { RemoteFormEnhanceCallback } from '$lib/types/utils/enhance-callback';
	import type { InputEvent } from '$lib/types/utils/input-event';

	import { validateRules } from './password-rules';

	let isSubmitting = $state(false);
	let showPassword: boolean = $state(false);
	let formIsValid: boolean = $state(false);
	let emailValue: string = $state('');
	let emailIsValid: boolean = $state(false);
	let passwordProgress: number = $state(0);
	let passwordErrors: Array<string> = $state([]);
	let passwordInputIsDirty: boolean = $state(false);
	let passwordSwitchText: 'Show' | 'Hide' = $state('Show');
	let passwordIsValid = $state(false);

	let { email, password } = register.fields;

	const handleRegisterEnhance: RemoteFormEnhanceCallback = async ({ submit }: any) => {
		try {
			isSubmitting = true;

			await submit();

			addToast('You are being registered', 'info');
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

	$effect(() => {
		passwordSwitchText = showPassword ? 'Hide' : 'Show';
		formIsValid = emailIsValid && passwordIsValid;
	});

	const rules: Rules = [
		{ key: 'minLength', regex: /^.{12,}$/, errorDescription: 'At least 12 characters' },
		{
			key: 'lowerCase',
			regex: /(?=(.*[a-z]){1,})/,
			errorDescription: 'At lease 1 lowercase character'
		},
		{
			key: 'upperCase',
			regex: /(?=(.*[A-Z]){1,})/,
			errorDescription: 'At lease 1 uppercase character'
		},
		{
			key: 'special',
			regex: /(?=(.*[!@#$%^&*\(\)_\-+=\{\}\[\];:'",<.>/?]){1,})/,
			errorDescription: 'At lease 1 special character'
		},
		{ key: 'number', regex: /(?=(.*[\d]){1,})/, errorDescription: 'At lease 1 number character' }
	];

	const handleEmailInput = ({ currentTarget }: InputEvent<HTMLInputElement>) => {
		emailValue = currentTarget.value;

		emailIsValid = currentTarget.checkValidity() ? true : false;
	};

	const handleShowPasswordClick = () => {
		showPassword = !showPassword;
	};

	const handlePasswordInput = ({ currentTarget }: InputEvent<HTMLInputElement>) => {
		const { errors: validationErrors, progress: validationProgress } = validateRules(
			currentTarget.value,
			rules
		);

		passwordErrors = validationErrors;
		passwordProgress = validationProgress;
		passwordInputIsDirty = true;

		const firstRule = rules.find((rule: Rule) => rule.key === validationErrors[0]);

		currentTarget.setCustomValidity(
			validationErrors.length > 0 && firstRule ? firstRule.errorDescription : ''
		);

		passwordIsValid = !firstRule;
	};
</script>

<svelte:head>
	<title>Hand & Foot - Register</title>

	<meta name="description" content="Register for an account" />
</svelte:head>

<h2>Register</h2>

<a href="/login">Login</a>
<a href="/reset">Forgot password?</a>

<form {...register.preflight(registerSchema).enhance(handleRegisterEnhance)}>
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
			autocomplete="new-password"
			inputmode="text"
			oninput={handlePasswordInput}
			aria-describedby="rules"
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

		<details id="rules" open>
			<summary>Password must meet the following conditions:</summary>
			<div>
				{#each rules as rule}
					<p role="presentation">
						{#if passwordErrors.includes(rule.key) || !passwordInputIsDirty}
							<Icon path={mdiClose} />
						{:else}
							<Icon path={mdiCheck} />
						{/if}

						<span>{rule.errorDescription}</span>
					</p>
				{/each}
			</div>
		</details>

		<p id="ruleStatus" role="alert" aria-live="polite" class="visually-hidden">
			{passwordProgress} out of {rules.length} requirements complete
		</p>
	</div>

	<button
		type="submit"
		disabled={!formIsValid || isSubmitting || null}
		aria-disabled={!formIsValid || isSubmitting || null}
		aria-busy={isSubmitting}>Submit</button
	>
</form>

<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageProps } from './$types';
	import { validateRules, type Rules } from './password-rules';

	type InputEvent<T> = Event & { currentTarget: EventTarget & T };

	let showPassword: boolean = $state(false);
	let formIsValid: boolean = $state(false);
	let emailValue: string = $state('');
	let emailIsValid: boolean = $state(false);
	let passwordValue: string = $state('');
	let passwordProgress: number = $state(0);
	let passwordErrors: Array<string> = $state([]);
	let passwordInputIsDirty: boolean = $state(false);
	let passwordSwitchText: 'Show' | 'Hide' = $state('Show');
	let passwordIsValid = $state(false);

	let { form }: PageProps = $props();

	$effect(() => {
		passwordSwitchText = showPassword ? 'Hide' : 'Show';
		formIsValid = emailIsValid && passwordIsValid;
		passwordValue = form?.errors ? '' : passwordValue;
	});

	const rules: Rules = [
		{ key: 'minLength', regex: /^.{12,}$/, errorDescription: '12 characters minimum' },
		{ key: 'lowerCase', regex: /[a-z]/, errorDescription: 'At lease 1 lowercase character' },
		{ key: 'upperCase', regex: /[A-Z]/, errorDescription: 'At lease 1 uppercase character' },
		{
			key: 'special',
			regex: /[!@#$%^&*()_\-+={[}\];:/?.><]/,
			errorDescription: 'At lease 1 special character'
		},
		{ key: 'number', regex: /\d/, errorDescription: 'At lease 1 number character' }
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

		const firstRule = rules.find((rule) => rule.key === validationErrors[0]);

		currentTarget.setCustomValidity(
			validationErrors.length > 0 && firstRule ? firstRule.errorDescription : ''
		);

		passwordIsValid = !firstRule;
	};
</script>

<h2>Register</h2>

<a href="/login">Login</a>

<form method="POST" use:enhance>
	<div>
		<label for="email">Email:</label>
		<input
			required
			id="email"
			name="email"
			autocomplete="email"
			inputmode="email"
			type="email"
			value={form?.data ?? emailValue}
			oninput={handleEmailInput}
		/>
	</div>

	<div>
		<label for="password">Password:</label>
		<!--  -->
		<input
			required
			id="password"
			name="password"
			autocomplete="new-password"
			inputmode="text"
			type={showPassword ? 'text' : 'password'}
			value={passwordValue}
			oninput={handlePasswordInput}
			aria-describedby="rules"
		/>
		<button
			type="button"
			role="switch"
			aria-checked={showPassword}
			aria-label="{passwordSwitchText} password"
			onclick={handleShowPasswordClick}>{passwordSwitchText}</button
		>

		<details id="rules" open>
			<summary>Password must meet the following conditions:</summary>
			<div>
				{#each rules as rule}
					<p role="presentation">
						{#if passwordErrors.includes(rule.key) || !passwordInputIsDirty}
							<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"
								><path
									d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
								/></svg
							>
						{:else}
							<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"
								><path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" /></svg
							>
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

	<button type="submit" disabled={!formIsValid || null} aria-disabled={!formIsValid || null}
		>Submit</button
	>
</form>

<div id="errors" role="alert" aria-live="polite">
	{#if form?.errors}
		<p>{Object.values(form.errors[0])[0]}</p>
	{/if}
</div>

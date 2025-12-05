<script lang="ts">
	import { isHttpError } from '@sveltejs/kit';

	import { reset } from '$lib/api/auth';
	import { resetSchema } from '$lib/schemas/reset-schema';
	import { addToast } from '$lib/stores';
	import type { RemoteFormEnhanceCallback } from '$lib/types/utils/enhance-callback';

	let isSubmitting = $state(false);

	let { email } = reset.fields;

	const handleResetSubmit: RemoteFormEnhanceCallback = async ({ submit }) => {
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
	<title>Hand & Foot - Reset Password</title>

	<meta name="description" content="Reset your password" />
</svelte:head>

<hgroup>
	<h2>Reset Password</h2>
	<p>
		If you have forgotten your password, please enter the email that you think is your email on your
		account.
	</p>
</hgroup>

<form {...reset.preflight(resetSchema).enhance(handleResetSubmit)}>
	<div>
		<label for="email">Email:</label>
		<input required id="email" autocomplete="email" inputmode="email" {...email.as('email')} />
	</div>

	<button type="submit" disabled={isSubmitting || null}>Send email</button>
</form>

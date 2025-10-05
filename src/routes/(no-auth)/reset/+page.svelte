<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from './$types';

	let isSubmitting = $state(false);

	const handleResetSubmit: SubmitFunction = (e) => {
		isSubmitting = true;

		return async ({ update }) => {
			isSubmitting = false;

			await update();
		};
	};
</script>

<hgroup>
	<h2>Reset Password</h2>
	<p>
		If you have forgotten your password, please enter the email that you think is your email on your
		account.
	</p>
</hgroup>

<form method="POST" use:enhance={handleResetSubmit}>
	<div>
		<label for="email">Email:</label>
		<input required id="email" name="email" autocomplete="email" inputmode="email" type="email" />
	</div>

	<button type="submit" disabled={isSubmitting || null}>Send email</button>
</form>

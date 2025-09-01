<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<h2>Login</h2>

<a href="/register">Register</a>

<form action="/auth?/login" method="POST" use:enhance>
	<div>
		<label for="email">Email:</label>
		<input
			required
			id="email"
			type="email"
			name="login:email"
			autocomplete="email"
			inputmode="email"
		/>
	</div>

	<div>
		<label for="password">Password:</label>
		<input
			required
			id="password"
			type="password"
			name="login:password"
			autocomplete="current-password"
			inputmode="text"
		/>
	</div>

	<button type="submit">Submit</button>
</form>

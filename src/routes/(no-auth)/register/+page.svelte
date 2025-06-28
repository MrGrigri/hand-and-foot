<h2>Register</h2>

<form action="/auth?/register" method="POST">
	<div>
		<label for="email">Email:</label>
		<input
			required
			id="email"
			type="email"
			name="register:email"
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
			name="register:password"
			autocomplete="new-password"
			inputmode="text"
		/>
	</div>

	<div>
		<label for="password-confirm">Password:</label>
		<input
			required
			id="password-confirm"
			type="password"
			name="register:password-confirm"
			autocomplete="new-password"
			inputmode="text"
		/>
	</div>

	<button type="submit">Submit</button>
</form>

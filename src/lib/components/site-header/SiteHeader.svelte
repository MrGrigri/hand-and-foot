<script lang="ts">
	import { logout } from '$lib/api/auth';

	let { isLoggedIn = false } = $props();

	const handleButtonLogout = async () => {
		await logout();
	};
</script>

<header>
	<h1>Hand & Foot</h1>

	<menu>
		<ul>
			<li><a href="/how-to">Help</a></li>
			{#if isLoggedIn}
				<li>
					<a href="/dashboard">Dashboard</a>
				</li>
				<li>
					<button type="button" onclick={handleButtonLogout}>Logout</button>
				</li>
			{:else}
				<li><a href="/login">Login</a></li>
				<li><a href="/register">Register</a></li>
			{/if}
		</ul>
	</menu>
</header>
